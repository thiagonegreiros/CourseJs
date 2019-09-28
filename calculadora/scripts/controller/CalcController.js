class CalcController{

    constructor()
    {
        //This - Reference of Atributes and Methods
        
        // Áudio
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        //Operações
        this._lastOperator = "";
        this._lastNumber   = "";

        this._operation    = []; 
        this._locale = "pt-BR"
        this._displayCalEl = document.querySelector("#display");
        this._dateEl       = document.querySelector("#data");
        this._timeEl       = document.querySelector("#hora");
        this._displayCalc = "0"; 
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

        /*
            Tipos de encapsulamento

            Public  - Todos conseguem acessar; 
            Protect - Atributos e metodos da mesma classe e classes Pai
            Private - Somente atributos e metodos da propria classe 
                      é referenciado por um underline no inicio do 
                      atributo Ex: this._currentDate;     
        */
    }

    pastFromClipBoard()
    {
        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');
        
            this.displayCalc = parseFloat(text);

            console.log(text);
        });
    }

    copyToClipBoard()
    {
        //Cria um elemento HTML via JS
        let input = document.createElement('input');

        input.value = this.displayCalc;

        //Append Child coloca o elemnto como filho do elemento selecionado
        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }

    initialize()
    {
        //Let - comando para declarar variaveis definindo o escopo

        //Setinterval - Função executada em um intervalo de tempo
        //              Medido em milesegundos
        //ArrowFunction um novo recurso para a criação de funções

        this.setDisplayDateTime();
        this.setLastNumberToDisplay();
        this.pastFromClipBoard();

        document.querySelectorAll('.btn-ac').forEach(btn => 
        {
            btn.addEventListener('dbclick', e =>
            {
                this.toogleAudio();
            });
        });

        setInterval(() => 
        {
            this.setDisplayDateTime();

        }, 1000);

    }

    toogleAudio()
    {
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio()
    {
        if(this._audioOnOff)
        {
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    //Caaptura os eventos do meu teclado
    initKeyboard()
    {
        document.addEventListener('keyup', e => {

            this.playAudio();

        switch (e.key)
        {
            case 'Escape':
                this.clearAll();
                break;
            case 'Backspace':
                this.clearEntry();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                this.addOperation(e.key);
                break;
            case 'Enter':
            case '=':
                  this.calc();  
                break;

            case '.':
            case ',':
                    this.addDot();
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
                this.addOperation(parseInt(e.key));
                break;
            case 'c':
                if(e.ctrlKey) this.copyToClipBoard();
                break;
        }

        });
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
        this._operation    = [];
        this._lastNumber   = '';
        this._lastOperator = '';
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
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
        
    }

    pushOperator(value)
    {
        this._operation.push(value);

        if(this._operation.length > 3)
        {
            this.calc();
        }
    }

    getResult()
    {
        try
        {
            return eval(this._operation.join(""));
        }
        catch(e)
        {
            setTimeout(()=>{this.setError();}, 1);
            console.error(e);
        }
    }

    calc()
    {
        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3)
        {
            let firstItem   = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]; 
        }
        
        if(this._operation.length > 3)
        {
            last = this._operation.pop();
            this._lastNumber= this.getResult();    
        }
        else if(this._operation.length == 3)
        {
            this._lastNumber = this.getLastItem(false);  
        }
        
        let result = this.getResult();
        
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

    getLastItem(isOperator = true)
    {
        let lastItem;

        for(let i = this._operation.length - 1; i>=0; i--)
        {
            if(this.isOperator(this._operation[i]) == isOperator)
            {
                lastItem = this._operation[i];
                break;
            }
        } 

        if(!lastItem)
        {
            lastItem = (isOperator)? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }


    setLastNumberToDisplay()
    {
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value)
    {
        if(isNaN(this.getLastOperation()))
        {
            // console.log("String", value, isNaN(this.getLastOperation()));
            //String
            if(this.isOperator(value))
            {
                this.setLastOperator(value);
            }
            else
            {
                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }
        }
        else
        {
            // console.log(this.pushOperator(value));
            if(this.isOperator(value))
            {
                this.pushOperator(value);
                
            }
            else
            {
                //Number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperator(newValue);

                this.setLastNumberToDisplay();

            }

        }


       

    }

    setError()
    {
        this.displayCalc = "Error";
    }

    addDot()
    {
        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation)
        {   
            this.pushOperator("0.");
        }
        else
        {
            this.setLastOperator(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    execBtn(value)
    {
        this.playAudio();
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
                    this.addDot();
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
        if(value.toString().length > 10)
        {
            this.setError();
            return false;
        }
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