
/* N colors gradient heat table ---------------------------------------------- 

    Required range:
    R = {ℤ,Q}  

    Required colors:
    N
*/

let selectTable = document.getElementById("myTable_2");
let selectTds = selectTable.getElementsByTagName("td");
let tdsLength = selectTds.length;

let startX = (tdsLength) => { 
        /* ------------------------------------ Create random numbers from 2 number range and add those numbers to each table cell  */
        // console.log( tdsLength )

        let tableValuesInArray = [];


        let generateRandomNumber_X = (min, max) => {
            return Math.random() * (max - min + 1) + min ;
        }

        function removeDuplicates(arr) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }

        for (let i = 0; i < tdsLength; i++){
            Number( selectTds[i].innerHTML = generateRandomNumber_X( -545.9,1889.8 ) )
            tableValuesInArray.push( Number(selectTds[i].innerHTML) )
        }

        let sortedArrayX = tableValuesInArray.sort(
            function(a,b){ 
                return a - b
            }
        );

        for (let i = 0; i < tdsLength; i++){
            Number( selectTds[i].innerHTML = sortedArrayX[i].toFixed(3) ) /* Number in base 10 with 3 digits after the decimal point */
        }

        /* ----------------------------------------------------------- Iterate over selected colors list */

        let selectColorsBox = document.getElementById("list");
        let selectColorDivs = selectColorsBox.getElementsByClassName("gradientSelectedColor");
        let selectColorDivsLength = selectColorDivs.length;

        let gradientProportions = tdsLength/selectColorDivsLength // Math.floor( tdsLength/selectColorDivsLength)

        console.log( "Colors length "+selectColorDivsLength )
        // console.log("gradientProportions "+gradientProportions)

        let arrayProportionalCounter = 0

        let newProportionForMaxMin = ( gradientProportions / (selectColorDivsLength-1 ) )
        let arrayRationalPortion = 0


        /* ---------------------------------------------- Remove decimals if number is rational */
        function removeDecimalsForSum(num) {
            if( num % 1 != 0 ){
                let splitedDecimal = (num + "").split(".")[1]
                let concatDecimalAndCero = Number( ('0.').concat(splitedDecimal) )

                return concatDecimalAndCero 
                // console.log( concatDecimalAndCero )
            }else{
                return num
            }
        }

        /* ---------------------------------------------- Create an array from RGB values */
        let getRBGvaluesArray = (color, type) => { 
            var rgb = [];
            var hex;

            if( color.substr(0, 3) === 'rgb' ) {
                if(type==='obj'){
                    let colors = ["red", "green", "blue", "alpha"] 
                    
                    let colorArr = color.slice( 
                        color.indexOf("(") + 1,  
                        color.indexOf(")") 
                    ).split(", "); 
                    
                    let obj = new Object(); 
                    
                    colorArr.forEach((k, i) => { 
                        obj[colors[i]] = k 
                    }) 
                    
                    return obj
                    
                }else if( type==='arr' ){
                    let colorArr = color.slice( 
                        color.indexOf("(") + 1,  
                        color.indexOf(")") 
                    ).split(", "); 
                
                    let colorsArr = [];
                
                    colorArr.forEach((k, i) => {
                        colorsArr.push( Number(k) )
                    }) 
                    return colorsArr; 
                }
            }else if( color.substr(0, 1) === '#' ){
                hex = color.substr(1).split('');
                if( hex.length === 3 ){
                    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
                }
                if( hex.length === 6 ){
                    var i = 0;
                    var x = 0;
                    var hexStr;

                    while( i < 3 ){
                        hexStr = hex[x] + hex[x + 1];
                        rgb[i] = parseInt(hexStr, 16);
                        i += 1;
                        x = i * 2;
                    }

                    for( var i = 0; i < rgb.length; i++ ){
                        rgb[i] = parseInt(rgb[i], 10);
                    }
                    return rgb;
                }
            }
        }

        /* ------------------------------------------------- Get an array Median  */
        let getMedianValInTable = ( arr, min, max ) => {
            const middleIndex = Math.floor( arr.length / 2 );
            if ( arr.length % 2 === 0 ) {
                // Even - divisible by 2 without remainders and end in 0, 2, 4, 6, or 8
                return ( (arr[ middleIndex - 1 ] + arr[ middleIndex ] )) / 2 ; 
            }else {
                // Odd - divisible by 2 and end in 1, 3, 5, 7, or 9
                return arr[middleIndex];
            }
        };
        // const medianInTable =  getMedianValInTable( removeDuplicates(sortedArrayX), minNumInTable, maxNumInTable ); 

        /* ---------------------------------------------- Convert RGB to HEX */
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        
        /* ------------------------------------------- Create selected colors JSON object */

        let createEachColorObject = () => {
            this.shelf = []; 
            for( var i = 0; i < selectColorDivsLength; i++ ){
                this.shelf.push(
                    getRBGvaluesArray(selectColorDivs[i].style.backgroundColor,'obj')
                ); 
            }
            return this.shelf 
        }

        let colorsObject = {
            cellsLength: 168,
            colorsLength: 5,
            active: true,
            colors: createEachColorObject()
        }

        /* -------------------------------------------  Calculate RGB values */

        let currentMaxNumber;
        let currentMinNumber; 

        let rUnits; 
        let gUnits; 
        let bUnits;

        let applyed_R_units;
        let applyed_G_units;
        let applyed_B_units;

        let finalRGBval

        let red1st
        let red2nd
        let green1st
        let green2nd
        let blue1st
        let blue2nd

        let parsingColorsJSON
        parsingColorsJSON = JSON.parse(JSON.stringify(colorsObject))
        // console.log( parsingColorsJSON )

        let newIc
        let calculateRGBvaluesX = (currentCellIndex, minCurrentNumber, maxCurrentNumber, index ) => {

            newIc = index+1

            red1st    =  Number(parsingColorsJSON.colors[index].red)
            red2nd    =  Number(parsingColorsJSON.colors[newIc].red)
            green1st  =  Number(parsingColorsJSON.colors[index].green)
            green2nd  =  Number(parsingColorsJSON.colors[newIc].green)
            blue1st   =  Number(parsingColorsJSON.colors[index].blue )
            blue2nd   =  Number(parsingColorsJSON.colors[newIc].blue)

            /* RED */
            if( red1st > red2nd ){
                rUnits = (red1st - red2nd)  / (maxCurrentNumber-minCurrentNumber);
                applyed_R_units = red1st - ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * rUnits );
            }else if( red1st < red2nd ){
                rUnits = (red2nd - red1st )  / (maxCurrentNumber-minCurrentNumber);
                applyed_R_units = red1st + ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * rUnits );
            }else if( red1st === red2nd ){
                applyed_R_units = red1st
            }

            /* GREEN */
            if( green1st > green2nd ){
                gUnits = (green1st - green2nd)  / (maxCurrentNumber-minCurrentNumber);
                applyed_G_units = green1st - ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * gUnits );
            }else if( green1st < green2nd ){
                gUnits = (green2nd - green1st )  / (maxCurrentNumber-minCurrentNumber);
                applyed_G_units = green1st + ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * gUnits );
            }else if( green1st === green2nd ){
                applyed_G_units = green1st
            }

            /* BLUE */
            if( blue1st > blue2nd ){
                bUnits = (blue1st - blue2nd )  / (maxCurrentNumber-minCurrentNumber);
                applyed_B_units = blue1st - ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * bUnits );
            }else if( blue1st < blue2nd ){
                bUnits = (blue2nd - blue1st )  / (maxCurrentNumber-minCurrentNumber);
                applyed_B_units = blue1st + ( (( Number(selectTds[currentCellIndex].innerHTML) - minCurrentNumber) )  * bUnits );
            }else if( blue1st === blue2nd ){
                applyed_B_units = blue1st
            }

            finalRGBval = 'rgb(' + applyed_R_units+ ',' +applyed_G_units+ ',' +applyed_B_units+ ')';
            return finalRGBval 
        }

        let RGBvalues
        let arrayMedian = [];

        let getProportionaRangesInTable = ( lengthX ) => {
            
            if(selectColorDivsLength===2){
                arrayRationalPortion = gradientProportions
            }else{
                arrayRationalPortion = gradientProportions + newProportionForMaxMin
            }

            currentMinNumber = selectTds[ 0 ].innerHTML;
            currentMaxNumber = selectTds[ Math.trunc(arrayRationalPortion) ].innerHTML;

            for( let i = 0; i < lengthX; i++ ){

                if( selectColorDivsLength > tdsLength  ){
                    selectTds[i].style.backgroundColor = 'rgb(' +  Number(parsingColorsJSON.colors[i].red)+ ',' + Number(parsingColorsJSON.colors[i].green) + ',' + Number(parsingColorsJSON.colors[i].blue)+ ')';
                }else{
                    /* Check if proportion is Rational */
                    if( arrayRationalPortion % 1 != 0 ){

                        // console.log( "DECIMAL " + i)
                        arrayMedian.push( selectTds[ i ].innerHTML )
                        
                        if( (i+removeDecimalsForSum(arrayRationalPortion)) === (Number(arrayRationalPortion) ) ){

                            if(selectColorDivsLength===2){
                                arrayRationalPortion += gradientProportions
                            }else{
                                arrayProportionalCounter+=1
                                arrayRationalPortion += gradientProportions + newProportionForMaxMin
                            }

                            if( arrayRationalPortion===lengthX  ){
                                // console.log( '----- Final iteration D -----' + i)
                                currentMinNumber = selectTds[ i ].innerHTML;
                                currentMaxNumber = selectTds[ lengthX-1 ].innerHTML;
                            }

                            if( Number(arrayRationalPortion) < lengthX){
                                currentMinNumber = selectTds[ i+1 ].innerHTML;
                                currentMaxNumber = selectTds[ Math.trunc(arrayRationalPortion) ].innerHTML;
                                arrayMedian = []
                            }
                            // console.log('******** We are in part D - ' + arrayProportionalCounter + ' / arrayRationalPortion ' + arrayRationalPortion )
                        }

                        if(selectColorDivsLength===2){
                            currentMinNumber = selectTds[ 0 ].innerHTML;
                            currentMaxNumber = selectTds[ tdsLength-1 ].innerHTML;

                            RGBvalues = calculateRGBvaluesX ( i, Number(currentMinNumber), Number( currentMaxNumber), arrayProportionalCounter )
                            selectTds[i].style.backgroundColor = RGBvalues
                        }else{
                            if( arrayProportionalCounter < selectColorDivsLength-1 ){
                                RGBvalues = calculateRGBvaluesX ( i, Number(currentMinNumber), Number( currentMaxNumber), arrayProportionalCounter ) 
                            }
                            selectTds[i].style.backgroundColor = RGBvalues 
                        }
                        
                    }

                    /* Check if proportion is Integer */
                    if( arrayRationalPortion % 1 === 0 ){

                        // console.log( "INTEGER "  + i )
                        arrayMedian.push( selectTds[ i ].innerHTML )

                        if( i === arrayRationalPortion ){ 

                            if(selectColorDivsLength===2){
                                arrayRationalPortion += gradientProportions
                            }else{
                                arrayProportionalCounter+=1
                                arrayRationalPortion += gradientProportions + newProportionForMaxMin
                            }

                            if( arrayRationalPortion===lengthX  ){
                                // console.log( '-----Final iteration I -----' + i )
                                currentMinNumber = selectTds[ i ].innerHTML;
                                currentMaxNumber = selectTds[ lengthX-1 ].innerHTML;
                            }

                            if( Number(arrayRationalPortion) < lengthX){
                                currentMinNumber = selectTds[ i+1 ].innerHTML;
                                currentMaxNumber = selectTds[ Math.trunc(arrayRationalPortion) ].innerHTML;

                                arrayMedian = []
                            }
                            // console.log('******** We are in part B - ' + arrayProportionalCounter + ' / arrayRationalPortion ' + arrayRationalPortion )
                        }

                        if(selectColorDivsLength===2){
                            currentMinNumber = selectTds[ 0 ].innerHTML;
                            currentMaxNumber = selectTds[ tdsLength-1 ].innerHTML;

                            RGBvalues = calculateRGBvaluesX ( i, Number(currentMinNumber), Number( currentMaxNumber), arrayProportionalCounter )
                            selectTds[i].style.backgroundColor = RGBvalues
                        }else{
                            if( arrayProportionalCounter < selectColorDivsLength-1 ){
                                RGBvalues = calculateRGBvaluesX ( i, Number(currentMinNumber), Number( currentMaxNumber), arrayProportionalCounter ) 
                            }
                            selectTds[i].style.backgroundColor = RGBvalues 
                        }
                    }
                } /* END else: if( selectColorDivsLength > tdsLength  )*/
            }/* END for( let i = 0; i < lengthX; i++ )  */

            // console.log( "[[ ARRAY ]]]" ) 
            // console.log( JSON.stringify(arrayMedian) )
        }
        getProportionaRangesInTable( tdsLength );
}
startX( tdsLength )


/* -------------------------------------------  Select colors box */

let selectColorsBox = document.getElementById("list");
let childreNewColor = selectColorsBox.getElementsByClassName("gradientSelectedColor");
let selectColorInput = selectColorsBox.getElementsByTagName("input");
let selectColor = selectColorsBox.getElementsByClassName("inside");
let colorsInputLength = selectColorInput.length;
let addedIndex

let colorAddedToPicker
let inputF 

function clickEachColor(){
    for( var i = 0, len = selectColorsBox.children.length; i < len; i++ ){
        (function(index){
            selectColorsBox.children[i].onclick = function(){
                addedIndex=index
                colorAddedToPicker= selectColorsBox.children[index].style.backgroundColor 
        
                selectColorInput[index].click();
                
            } 
            selectColorInput[index].addEventListener('click', e => {
                console.log("hola" + colorAddedToPicker )
                if(  catOverSwitch===true || catOverSwitch===false){
                    catMessagebox.classList.add('catImgBox')
                    catMessagebox.classList.remove('catImgShow')
                }
                
                Coloris({
                    theme: 'default',
                    themeMode: 'dark',
                    format: 'rgb',
                    // wrap: true,
                    // inline: true,
                    // parent: childreNewColor[index],
                    defaultColor: colorAddedToPicker
                });

                inputF = document.getElementById("clr-color-value");
                inputF.value = colorAddedToPicker;
            });   
    })(i);}
    
}  
clickEachColor()

document.addEventListener('coloris:pick', event => {
    childreNewColor[addedIndex].style.backgroundColor = event.detail.color
    selectColor[addedIndex].style.backgroundColor = event.detail.color

    startX( tdsLength ); 
});

let actionsBox = document.querySelector(".actionsBox");
let addButtonclick = document.querySelector(".buttonAddColor");
let addButtonInputBox = document.querySelector(".addColorInput");
let addButtonInput = document.querySelector("#adColor");

const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

let sortableDisabled
let catOverSwitch
let catMessagebox = document.querySelector(".catMessagebox");
let deleteColorBox = document.querySelector(".blockDeleteBox");

let newSortable = new Sortable(list, {
    swapThreshold: 1,
    animation: 150,
    onStart: function(){ 
        selectColorsBox = document.getElementById("list");
        selectColorDivs = selectColorsBox.getElementsByClassName("gradientSelectedColor");
        selectColorDivsLength = selectColorDivs.length;

        sortableDisabled = deleteSortable.option("disabled");

        if(  selectColorDivsLength === 2  ){
            // console.log( "true  "+ true ) 
            deleteSortable.option("disabled", !sortableDisabled);
            // deleteColorBox.style.display = "block"
            catOverSwitch=true
        }   
        if(  catOverSwitch===true || catOverSwitch===false){
            catMessagebox.classList.add('catImgBox')
            catMessagebox.classList.remove('catImgShow')
        }
    },
    onEnd: function(){ 
        startX( tdsLength ); 
        console.log("Change END")
        clickEachColor() 

        sortableDisabled = deleteSortable.option("disabled");

        if(  selectColorDivsLength === 2  ){
            // console.log( "false  "+ false ) 
            deleteSortable.option("disabled", !sortableDisabled);
            catOverSwitch=false
            // deleteColorBox.style.display = "none"
        } 
    },
    direction: 'horizontal',
    group: "items",
   
});

let deleteSortable = new Sortable(deleteColor, {
    group: "items",
    onAdd: function (evt) {
        this.el.removeChild(evt.item);
        startX( tdsLength );
        console.log("Deleted")
    },
    onChoose: function (evt) {
        
        console.log("Choose")
    } 
});

let addColor = () => {
    if(  catOverSwitch===true || catOverSwitch===false){
        catMessagebox.classList.add('catImgBox')
        catMessagebox.classList.remove('catImgShow')
    }

    selectColorsBox = document.getElementById("list");
    selectColorDivs = selectColorsBox.getElementsByClassName("gradientSelectedColor");
    selectColorDivsLength = selectColorDivs.length;

    let newHexTemplate = randomHexColorCode()
    let sortableEnable= newSortable.option("enable");
      
    if( selectColorDivsLength > 2 ){
        deleteSortable.option("enable", sortableEnable);
        catOverSwitch=false
    }

    let colorTemplate = `
        <div class='gradientSelectedColor mx-1' style="background-color:` + newHexTemplate+ `;">
            <div class='inside' style="background-color:` + newHexTemplate+ `;" ></div>
            <div class="colorSelectionInput">
                <input type="text" data-coloris>
            </div>
        </div>
    `
    selectColorsBox.innerHTML+=colorTemplate
    startX( tdsLength )
    clickEachColor()
};

function allowDrop(event) {
    console.log( "Allowed  " ) 
    if(  catOverSwitch===true ){
        catMessagebox.classList.remove('catImgBox')
        catMessagebox.classList.add('catImgShow')
    }
    event.preventDefault();
}

addButtonclick.addEventListener("click", addColor );




