//Toda classe começa com o nome em maiusculo
class User {
    // Metodo construtor
    constructor(name, gender, birth, country, email, password, photo, admin) {
        //Atributo - variavel
        this._id;
        this._admin;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;

        // Data
        this._register = new Date();
    }

    get id() {
        return this._id;
    }
    
    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    get birth() {
        return this._birth;
    }
    get country() {
        return this._country;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get photo() {
        return this._photo;
    }
    get admin() {
        return this._admin;
    }

    set photo(value)
    {
        this._photo = value;
    }

    loadFromJSON(json)
    {
        for(let name in json)
        {
            switch (name) {
                case '_register':
                        this[name] = new Date(json[name]);
                    break;
            
                default:
                        this[name] = json[name];

                    break;
            }

           
        }
    }

    static getUserStorage()
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

    getNewID()
    {
        if(!window.id) window.id = 0;

        id++;

        return id;
    }


    save()
    {
        let users = User.getUserStorage();

        // gerando um id
        if(this.id > 0)
        {
            console.log("Id igual a zero!");
            users.map(u=>
            {
                if(u._id === this.id)
                {
                    u = this;
                }

                return u;
            });
        }
        else
        {
            console.log("Id maior que zero!");
            this._id = this.getNewID();
            users.push(this);
        }
        
        /*
            Session Storage - Permite gravar dados na sessão
            Se fechar o navegador, deixa de existir
        */ 
        // sessionStorage.setItem("users", JSON.stringify(users));
        
        /*
        Local Storage - Permite gravar dados no navegador
        Mesmo se fechar o navegador ele continua existindo
        */ 
       localStorage.setItem("users", JSON.stringify(users));

        
    }
}