import { useRef } from "react";

import Button from "~/components/html/button/Button";
import Submit from "~/components/html/forms/Submit";
import Textarea from "~/components/html/forms/unvalidated/Textarea";
import Form from "~/components/html/forms/validated/Form";

import A from "./components/a";
import Barred from "./components/Barred";
import Bold from "./components/Bold";
import Dialog from "./components/Dialog";
import Hr from "./components/Hr";
import Img from "./components/Img";
import Italic from "./components/Italic";
import Item from "./components/Item";
import Quote from "./components/Quote";
import Separator from "./components/Separator";
import SimpleQuote from "./components/SimpleQuote";
import Stats from "./components/Stats";
import Title1 from "./components/Title1";
import Title2 from "./components/Title2";
import Title3 from "./components/Title3";
import Title4 from "./components/Title4";
import Title5 from "./components/Title5";
import Title6 from "./components/Title6";
import Vitals from "./components/Vitals";

function RichContentEditor({ item, onCancel, onChange }) {
  const textareaRef = useRef();

  const onSubmit = (formData) => {
    console.log("formData", formData);
  };

  const onContentChange = (e) =>
    onChange?.({ ...item, content: e.target.value });

  return (
    <Form onSubmit={onSubmit} defaultValues={item} className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-center border-b border-gray-800">
          <div className="flex-1 border-r border-gray-800">
            {[
              [
                Title1,
                Title2,
                Title3,
                Title4,
                Title5,
                Title6,
                Separator,
                Bold,
                Italic,
                Barred,
              ],
              [Hr, Separator, Img, A],
              [
                Item,
                Separator,
                Vitals,
                Stats,
                Separator,
                Dialog,
                Separator,
                SimpleQuote,
                Quote,
              ],
            ].map((row, rIndex) => (
              <div key={rIndex} className="flex flex-none items-center gap-2">
                {row.map((Component, bIndex) => (
                  <Component key={bIndex} textareaRef={textareaRef} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center px-4">
            <Button
              onClick={onCancel}
              variant="text"
              color="secondaryDark"
              size="small"
              block
            >
              <i className="fa-solid fa-xmark" />
            </Button>
            <Submit size="small" variant="text" block>
              <i className="fa-solid fa-check" />
            </Submit>
          </div>
        </div>
        <Textarea
          ref={textareaRef}
          id="content"
          name="content"
          defaultValue={item.content}
          onInput={onContentChange}
          className="peer z-10 flex-1 appearance-none bg-transparent text-gray-800 outline-none ring-0 active:outline-none active:ring-0"
        />
      </div>
    </Form>
  );
}

export default RichContentEditor;
