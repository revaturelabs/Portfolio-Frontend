import { Toast } from "react-bootstrap";

const PhaseSubmissionToast = ( ) => {
    return(
        <>
            {console.log("TRYING")}
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Incomplete Submission for Phase 1</strong>
                </Toast.Header>
                <Toast.Body>
                    The following are required in order to submit your portfolio for phase 1 review:

                    {/* {messages.map((msg) => {
                                <p>{msg}</p>
                    })} */}
                </Toast.Body>
            </Toast>

        </>
    );
}

export default PhaseSubmissionToast;