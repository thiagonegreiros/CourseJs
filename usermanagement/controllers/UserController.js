class UserController
{
    constructor(formIdCreate, formIdUpdate, tableId)
    {
        this.formEl       = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl      = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();
    }

    onEdit()
    {
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e =>
        {
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event => 
        {
            //Cancela o comportamento padrão do evento
            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            // Copia o valor de atributos de um objeto
            // Cria um objeto destino, retornando este objeto
            let result = Object.assign({}, userOld, values);


                // Chamando a função promisses
                this.getPhoto(this.formUpdateEl).then(
                    (content) => {
                        // Se der certo

                        if(!values.photo){ 
                            result._photo = userOld._photo;
                        }else{
                            result._photo = content;
                        }
                        let user = new User();

                        user.loadFromJSON(result);
                        user.save();
                        this.getTr(user, tr);
                        this.updateCount();
                        this.formUpdateEl.reset();
                        btn.disabled = false;
                        this.showPanelCreate();
                }, 
                (e) => 
                {
                    // Se der errado
                    console.error(e);
                }
            );
        });
    }

    onSubmit()
    {
        // Essa variavel se refere a um escopo acima
        // Nesse caso ela está referenciando toda a classe
        // let _this = this;
        
       this.formEl.addEventListener("submit", event => {
    
            //Cancela o comportamento padrão do evento
            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if(!values) return false;

            // Chamando a função promisses
            this.getPhoto(this.formEl).then(
                (content) => {
                    // Se der certo
                    values.photo = content;
                    values.save();
                    // this.insert(values);
                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false;
                }, 
                (e) => 
                {
                    // Se der errado
                    console.error(e);
                }
            );
        });
    }

    // FILE READER - Função que mostra o caminho de um arquivo dentro do computador.
    getPhoto(formEl)
    {

        return new Promise((resolve, reject) =>
        {
               // Função nativa do JS
            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => 
            {
                if(item.name === 'photo')
                {
                    return item;
                }    
            });

            let file = elements[0].files[0];
            // console.log(elements[0].files[0]);

            fileReader.onload = () => 
            {
                resolve(fileReader.result);
            }

            fileReader.onerror = (e) => 
            {
                reject(e);
            }

            if(file)
            {
                fileReader.readAsDataURL(file);
            }
            else
            {
                resolve('dist/img/boxed-bg.jpg');
            }


        });//End promisses

     
    }

    getValues(formEl)
    {
        //O let cria uma variavel local
        //somente dentro do metodo
        let user = {};
        let isValid = true;

        //Spread
        [...formEl.elements].forEach(function (field, index) {

            // Validação de fomularios
            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value)
            {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }


            if (field.name == "gender") {
                if (field.checked) user[field.name] = field.value;
            }
            else if(field.name == 'admin')
            {
                user[field.name] = field.checked;
            }
            else {
                user[field.name] = field.value;
            }
        });

        if(!isValid) 
        {
            return false;
        }

        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

    }//End get values


    getUserStorage()
    {
        let users = [];

        // SESSION STORAGE
        // if(sessionStorage.getItem("users"))
        // {
        //     users = JSON.parse(sessionStorage.getItem("users"));
        // }

        // LOCAL STORAGE
        if(localStorage.getItem("users"))
        {
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
    }

    selectAll()
    {
        let users = this.getUserStorage();

        users.forEach(dataUser => {

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user);
        });
    }

    //Adiciona a linha na tabela
    addLine(dataUser)
    {
        let tr = this.getTr(dataUser);

        //Cria um filho 
        this.tableEl.appendChild(tr);

        this.updateCount();
    }

    getTr(dataUser, tr = null)
    {

        if(tr === null) tr = document.createElement('tr');

        // JSON.stringify - Transforma um objeto JSON em uma String
        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin)? 'Sim':'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;

        this.addEventsTr(tr);

        return tr;
    }

    addEventsTr(tr)
    {

        // Faz a função de excluir os dados da tela
        tr.querySelector(".btn-delete").addEventListener("click", e => 
        {
            if(confirm("Deseja realmente excluir?"))
            {
                tr.remove();
                this.updateCount();
            }
        });

        // Faz a função de alterar os dados da tela
        tr.querySelector(".btn-edit").addEventListener("click", e=>
        {
            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {
                
                let field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"]");

                if(field)
                {
                    switch (field.type) {
                        case 'file':
                            continue;
                        break;
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"][value="+json[name]+"]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            field.checked = json[name];    
                        break;
                    
                        default:
                            field.value = json[name];
                    }

                    
                }
            }
            this.formUpdateEl.querySelector(".photo").src = json._photo;
            this.showPanelUpdate();
        });
    }

    showPanelCreate()
    {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    }

    showPanelUpdate()
    {
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }

    //Metodo que atualiza a lista de usuarios
    updateCount()
    {
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            // Serialização, o JSON.parse converte string em JSON
            let user = JSON.parse(tr.dataset.user); 

            if(user._admin) numberAdmin++;
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}