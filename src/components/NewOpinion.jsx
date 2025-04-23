import { useActionState, use } from "react";

import { isEmpty, isNotLongEnough, isTooLong } from "../util/validation";

import { OpinionsContext } from "../store/opinions-context";

const OPINION_MAXLENGHT = 300;

const ERROR_MESSAGES = {
  userName: "User name must be at least three characters long.",
  title: "Title must be at least three characters long.",
  body: "Please write us your anonymous opinion.",
  bodyTooLong: `Your anonymous opinion must be less than ${OPINION_MAXLENGHT} characters long.`,
};

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)

  async function newOpinionAction(prevFormState, formState) {
    const userName = formState.get("userName");
    const title = formState.get("title");
    const body = formState.get("body");

    const errors = [];

    if (isNotLongEnough(userName, 3)) errors.push(ERROR_MESSAGES.userName);
    if (isNotLongEnough(title, 3)) errors.push(ERROR_MESSAGES.title);
    if (isEmpty(body)) errors.push(ERROR_MESSAGES.body);
    if (isTooLong(body, OPINION_MAXLENGHT))
      errors.push(ERROR_MESSAGES.bodyTooLong);

    console.log({ userName, title, body }); // DEBUG

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }

    // TODO send data to backend
    await addOpinion({ userName, title, body })

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(newOpinionAction, {
    errors: null,
    // PLACEHOLDER DATA
    enteredValues: {
      userName: "Ben",
      title: "Yes?",
      body: "Ho ho ho. No."
    }
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
