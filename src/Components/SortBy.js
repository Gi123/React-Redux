import moment from "moment";

function timestampdata(ar) {
    moment.locale('ru')
    if (ar) return(moment(ar).format("DD.MM.YYYY"))
}

function Sort(table,condition) {
    var array= [...table]
    var isNumber=false;
    var isString=false;
    var isDate=false;

    for(let i=0;i<array.length;i++) {
        // console.log(array[i][condition]);
        if (typeof array[i][condition] == "number")
            //Если все элементы число, то это число
            isNumber = true;
        else {
            //если хоть один элемент не число, то это либо дата, либо строка
            isString = true;
            isNumber = false;
            break;
        }
    }
    if(isNumber==true)
        array.sort(compare)
    else if (isString==true)
    {
        for(let i=0;i<array.length;i++) {
            if (moment(array[i][condition], "DD.MM.YYYY", true).isValid()){
                isDate = true;}
            else {
                isDate = false;
                break;
            }
        }
        //Если все элементы в формате даты, то это дата
        if(isDate) {
            for (let i = 0; i < array.length; i++) {
                console.log(array[i][condition]);
                array[i][condition] = array[i][condition].split('.');
                array[i][condition] = Date.parse(array[i][condition][2] + '-' + array[i][condition][1] + '-' + array[i][condition][0])
            }
            array.sort(compare)
            for (let i = 0; i < array.length; i++) {
                array[i][condition] = timestampdata(array[i][condition]);
            }
        }else
            array.sort(compareString);

    }

    function compare(obj1, obj2) {
        if (obj1[condition]==obj2[condition]) return 0
        if (obj1[condition]>obj2[condition])
            return 1
        else
            return -1
    }

    function compareString(obj1, obj2) {
        if (obj1!=null&& obj2!=null) {

            if (obj1[condition].toUpperCase() == obj2[condition].toUpperCase()) return 0
            if (obj1[condition].toUpperCase() > obj2[condition].toUpperCase())
                return 1
            else
                return -1
        }
    }
    return array;
}
export default Sort;