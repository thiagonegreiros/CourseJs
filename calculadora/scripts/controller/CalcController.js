class CalcController{

    constructor()
    {
        //This - Reference of Atributes and Methods
        this._operation    = []; 
        this._displayCalEl = document.querySelector("#display");
        // this._displayCalc  = document.querySelector("#display");
        this._dateEl       = document.querySelector("#data");
        this._timeEl       = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        


        /*
            Tipos de encapsulamento

            Public  - Todos conseguem acessar; 
            Protect - Atributos e metodos da mesma classe e classes Pai
            Private - Somente atributos e metodos da propria classe 
                      é referenciado por um underline no inicio do 
                      atributo Ex: this._currentDate;     
        */
    }

    initialize()
    {
        //Let - comando para declarar variaveis definindo o escopo

        //Setinterval - Função executada em um intervalo de tempo
        //              Medido em milesegundos
        //ArrowFunction um novo recurso para a criação de funções

        this.setDisplayDateTime();
        this.setLastNumberToDisplay();

        setInterval(() => 
        {
            this.setDisplayDateTime();

        }, 1000);

    }

    //Eventos
    addEventListenerAll(element,events, fn)
    {
        events.split(" ").forEach(event => 
        {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll()
    {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry()
    {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation()
    {
        return this._operation[this._operation.length-1];
    }

    setLastOperator(value)
    {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value)
    {
        return (["+", "-", "*", "%"].indexOf(value) > -1);
        
    }

    pushOperator(value)
    {
        this._operation.push(value);

        if(this._operation.length > 3)
        {
            this.calc();
        }
    }

    calc()
    {
        let last = '';

        if(this._operation.length > 3)
        {
            last = this._operation.pop();
        }

        let result = eval(this._operation.join(""));
        
        if(last == '%')
        {
            result /= 100;
            this._operation = [result];            
        }
        else
        {
            this._operation = [result];
            
            if(last) this._operation.push(last);
        }
        
        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay()
    {
        let lastNumber;

        for(let i = this._operation.length - 1; i>=0; i--)
        {
            if(!this.isOperator(this._operation[i]))
            {
                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value)
    {
        // console.log("A", value, isNaN(this.getLastOperation()))
        if(isNaN(this.getLastOperation()))
        {
            //String
            if(this.isOperator(value))
            {
                this.setLastOperator(value);
            }
            else if(isNaN(value))
            {
                console.log(value);
            }
            else
            {
                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }
        }
        else
        {
            if(this.isOperator(value))
            {
                this.pushOperator(value);
            }
            else
            {
                //Number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperator(parseInt(newValue));
                //this.pushOperator(value);


                this.setLastNumberToDisplay();
                console.log(this._operation);

            }

        }


       

    }

    setError()
    {
        this.displayCalc = "Error";
    }

    execBtn(value)
    {
        switch (value)
        {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation("+");
                break;
            case 'subtracao':
                    this.addOperation("-");
                break;
            case 'multiplicacao':
                    this.addOperation("*");
                break;
            case 'divisao':
                    this.addOperation("/");
                break;
            case 'porcento':
                    this.addOperation("%");
                break;
            case 'igual':
                  this.calc();  
                break;

            case 'ponto':
                    this.addOperation(".");
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }


    //Vai iniciar os eventos do botão
    initButtonsEvents()
    {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); 
        
        buttons.forEach((btn, index) => 
        {
            this.addEventListenerAll(btn, 'click drag', e => 
            {
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>
            {
                btn.style.cursor = "pointer";
            });
        });
    }
    
    setDisplayDateTime()
    {

        this.displayDate = this.currentDate.toLocaleDateString("pt-BR", 
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString("pt-BR");

    }

    /*
        Getters and Setters
        Permitem como acessar os valores.
    */

    get displayTime()
    {
        return this._timeEl.innerHTML;
    }

    set displayTime(time)
    {
        this._timeEl.innerHTML = time;
    }

    get displayDate()
    {
        return this._dateEl.innerHTML;
    }

    set displayDate(date)
    {
        this._dateEl.innerHTML = date;
    }

    get displayCalc()
    {
        return this._displayCalEl.innerHTML;
    }

    set displayCalc(value)
    {
        this._displayCalEl.innerHTML = value;
    }

    get currentDate()
    {
        return new Date();
    }

    set currentDate(data)
    {
        this._currentDate = data;
    }
}