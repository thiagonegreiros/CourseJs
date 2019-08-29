class CalcController{

    constructor()
    {
        //This - Reference of Atributes and Methods
        this._displayCalEl = document.querySelector("#display");
        this._dateEl       = document.querySelector("#data");
        this._timeEl       = document.querySelector("#hora");
        this._currentDate;
        this.initialize();


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

        setInterval(() => 
        {
            this.setDisplayDateTime();

        }, 1000);

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
        return this._displayCalc;
    }

    set displayCalc(value)
    {
        this._displayCalc = value;
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