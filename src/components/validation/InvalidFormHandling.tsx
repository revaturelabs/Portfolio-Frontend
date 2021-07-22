
const styleInvalidElements = (inputElements: HTMLCollectionOf<Element>) => {
    for(let i = 0; i < inputElements.length; i++){
        
        if(!inputElements.item(i)?.getAttribute('value')){
            inputElements.item(i)?.setAttribute('style', 'border-left: 3px solid red');
            
            inputElements.item(i)?.setAttribute('placeholder', '!');
        }
        else{
            inputElements.item(i)?.setAttribute('style', 'border-left: 1px solid black');
        }
    }
}


export default styleInvalidElements;