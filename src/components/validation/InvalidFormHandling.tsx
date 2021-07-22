
const styleInvalidElements = (inputElements: HTMLCollectionOf<Element>) => {
    for(let i = 0; i < inputElements.length; i++){
        
        if(!inputElements.item(i)?.getAttribute('value')){
            inputElements.item(i)?.setAttribute('style', 'border-left: 3px solid red');
            
            inputElements.item(i)?.setAttribute('placeholder', '!');
        }
    }
}

export default styleInvalidElements;