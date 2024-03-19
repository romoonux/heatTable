

/* 3 colors gradient heat table --------------------------------------------------------------------------------------------------------------- 

    RGBs:
    Green RGB( 225, 255, 228 )
    Blue  RGB( 95,  181, 244 )
    Red   RGB( 244, 113, 113 )

    if cell-val > median:
    // R-units increase from 95 to  244
    // G-units decrease from 181  to 113
    // B-units decrease from 244  to 113

    if cell-val < median:
    // R-units decrease from 225  to  95
    // G-units decrease from 255  to 181
    // B-units increase from 228  to 244

*/

    let selectTable = document.getElementById("myTable_2");
    let selectTds = selectTable.getElementsByTagName("td");
    let tdsLength = selectTds.length;

    let tableValuesInArray = [];

    let rUnits;
    let gUnits;
    let bUnits;

    let applyed_R_units;
    let applyed_G_units;
    let applyed_B_units;

    let finalRGBval;

    let generateRandomNumber_X = (min, max) => {
        return Math.floor( Math.random() * (max - min + 1) + min );
    }

    function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    for (let i = 0; i < tdsLength; i++){
        Number( selectTds[i].innerHTML = generateRandomNumber_X( 3,13 ) )
        tableValuesInArray.push( Number(selectTds[i].innerHTML) )
    }

    let sortedArrayX = tableValuesInArray.sort(
        function(a,b){ 
            return a - b 
        }
    );

    for (let i = 0; i < tdsLength; i++){
        Number( selectTds[i].innerHTML = sortedArrayX[i] )
    }

    console.log( JSON.stringify(removeDuplicates(sortedArrayX)) );

    const minNumInTable = Math.min.apply( Math,sortedArrayX );
    const maxNumInTable = Math.max.apply( Math,sortedArrayX );

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
    const medianInTable =  getMedianValInTable( removeDuplicates(sortedArrayX), minNumInTable, maxNumInTable ); 

    console.log( medianInTable );

    let getProportionaColorUnits = (tableTds) => {
        for ( let i = 0; i < tableTds; i++ ){
            if( ( Number(selectTds[i].innerHTML) ) > medianInTable || Number(selectTds[i].innerHTML) === medianInTable ){

                rUnits = (244-95)  / (maxNumInTable-medianInTable);
                gUnits = (181-113) / (maxNumInTable-medianInTable);
                bUnits = (244-113) / (maxNumInTable-medianInTable);

                applyed_R_units = 95  + ( (( Number(selectTds[i].innerHTML) - medianInTable) )  * rUnits );
                applyed_G_units = 181 - ( (( Number(selectTds[i].innerHTML) - medianInTable) )  * gUnits );
                applyed_B_units = 244 - ( (( Number(selectTds[i].innerHTML) - medianInTable) )  * bUnits );

                finalRGBval = 'rgb(' + applyed_R_units+ ',' +applyed_G_units+ ',' +applyed_B_units+ ')';
                selectTds[i].style.backgroundColor = finalRGBval ;

            }else if( ( Number(selectTds[i].innerHTML) ) < medianInTable ){
                rUnits = (225-95)  / (medianInTable-minNumInTable);
                gUnits = (255-181) / (medianInTable-minNumInTable);
                bUnits = (244-228) / (medianInTable-minNumInTable);

                applyed_R_units = 225 - ( (( Number(selectTds[i].innerHTML) - minNumInTable) )  * rUnits );
                applyed_G_units = 255 - ( (( Number(selectTds[i].innerHTML) - minNumInTable) )  * gUnits );
                applyed_B_units = 228 + ( (( Number(selectTds[i].innerHTML) - minNumInTable) )  * bUnits );

                finalRGBval = 'rgb(' +applyed_R_units+ ',' +applyed_G_units+ ',' +applyed_B_units+ ')';
                selectTds[i].style.backgroundColor = finalRGBval;  
            };

            finalRGBval='';
            applyed_R_units = 0;
            applyed_G_units = 0;
            applyed_B_units = 0;  

        }

    };
    getProportionaColorUnits( tdsLength )

    
