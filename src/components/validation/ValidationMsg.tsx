
/*
    Component responsible for taking string[] of error messages
    as props and displaying messages to user underneath 
    the form.
*/

import React from "react";

//component validation msg
const ValidationMsg = (props: any) => {

    //eror state
    console.log("In props.errors: " + props.errors);
        return( 
            <>
           <ul>
              {props.errors.map((error: string, i: number) => {
                  return <li key={i}>{error}</li>}
                )} 
           </ul>
           </>
        );
}

//Export to form components
export default ValidationMsg