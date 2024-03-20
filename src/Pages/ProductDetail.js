import React, {useState, useRef} from 'react'
import { Button } from 'react-bootstrap';
import { useParams, useHistory, Prompt } from 'react-router-dom/cjs/react-router-dom'

const ProductDetail = () => {

    const [leaving, setLeaving] = useState(false);
    const reviewRef = useRef('');

    const params = useParams();//useParam allow us access the parameters from the current route's path like here we are using productId and it returns an object where key are parameter which is productId here and values are values of URL data
    const history = useHistory();//useHistory is used for programmatic navigation and control over the navigation history in React Router applications. It allows you to push, replace, or go back and forth in the history stack, providing flexibility and control over the navigation flow. when react see history changes then it re-render of relaod the page even if we are in same page

    const formFocusHandler = () => {
        setLeaving(true);
    }
    const submitReviewHandler = () => {
        setLeaving(false);
    }

    const backHistoryHandler = () => {
        history.push('/Store');//we can give any link of history of navigation of that user.
    }

  return (
    <>
      <h3>Product Details for {params.productId}</h3>
      <Prompt when={leaving} message={(location) => 'are you sure want to leave, written data will be lost!'}/>
      {/* In form we used onFocus so that it will or keystroke focus to that form and we used prompt from react-router-dom to show prompt which takes when to show that prompt and the message */}
      <Button onClick={backHistoryHandler}>Back to List</Button>
      <div>
        <form onFocus={formFocusHandler} onSubmit={submitReviewHandler}>
            <label>Enter Review</label>
            <input type='text' ref={reviewRef}/>
        </form>
      </div>
    </>
  )
}

export default ProductDetail
