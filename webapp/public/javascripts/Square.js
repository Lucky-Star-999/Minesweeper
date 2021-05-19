/************************************************** Parent class *********************************************************/
class Square{
    constructor(square_type_number){
        let position;
        let property_number;                    // State from -1 (bomb) -> 9 (How many bombs around)
        this.relative_position = [];            // Store postion of all surrounding squares
        this.is_opened = false;                 // If the square is opened by clicked, this value is "true"
        let url_image;
        
        let square_particularly = new SquareFactory();
        return square_particularly.get_square(square_type_number);
    }

    get_property_number(){
        return this.property_number;
    }


}



/************************************************** Children class *********************************************************/

class Square_Bomb extends Square{
    constructor(){
        super();
        this.property_number = -1;
    }
}

class Square_0 extends Square{
    constructor(){
        super();
        this.property_number = 0;
    }
}

class Square_1 extends Square{
    constructor(){
        super();
        this.property_number = 1;
    }
}

class Square_2 extends Square{
    constructor(){
        super();
        this.property_number = 2;
    }
}

class Square_3 extends Square{
    constructor(){
        super();
        this.property_number = 3;
    }
}

class Square_4 extends Square{
    constructor(){
        super();
        this.property_number = 4;
    }
}

class Square_5 extends Square{
    constructor(){
        super();
        this.property_number = 5;
    }
}

class Square_6 extends Square{
    constructor(){
        super();
        this.property_number = 6;
    }
}

class Square_7 extends Square{
    constructor(){
        super();
        this.property_number = 7;
    }
}

class Square_8 extends Square{
    constructor(){
        super();
        this.property_number = 8;
    }
}


/************************************************** Factory *********************************************************/
class SquareFactory{
    constructor(){
        
    }

    get_square(square_type_number){
        switch(square_type_number){
            case -1:
                return new Square_Bomb();
                break;
            case 0:
                return new Square_0();
                break;
            case 1:
                return new Square_1();
                break;
            case 2:
                return new Square_2();
                break;
            case 3:
                return new Square_3();
                break;
            case 4:
                return new Square_4();
                break;
            case 5:
                return new Square_5();
                break;
            case 6:
                return new Square_6();
                break;
            case 7:
                return new Square_7();
                break;
            case 8:
                return new Square_8();
                break;
            default:
                break;
        }
    }
}



/************************************************** Test/Main function **********************************************/
/*let square_random = new Square(7);
console.log(square_random.get_property_number());*/