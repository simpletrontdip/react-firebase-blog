import { useState } from "react";
import RichTextEditor from "react-rte";

import styles from "./HtmlRte.module.scss";

const CUSTOM_STYLE_MAP = {
  CODE: {
    fontSize: 14,
    padding: 2,
  },
  PRE: {
    fontSize: 14,
    padding: 2,
  },
};
const TRIM_RIGHT_PATTERN = /((\\n)?<p><br><\/p>)+$/gm;
const TRIM_LEFT_PATTERN = /^((\\n)?<p><br><\/p>)+/gm;

const trimRightHtml = (htmlContent) => htmlContent && htmlContent.replace(TRIM_RIGHT_PATTERN, "");

const trimLeftHtml = (htmlContent) => htmlContent && htmlContent.replace(TRIM_LEFT_PATTERN, "");

const trimHtmlContent = (htmlContent) => trimLeftHtml(trimRightHtml(htmlContent));

const isHtmlString = (input) => input.startsWith("<") && input.endsWith(">");

const normalizeHtmlString = (input) =>
  // ignore \n in html tag content
  isHtmlString(input) ? input.replaceAll("\n", "") : input;

const HtmlRte = ({ placeholder, value, onChange }) => {
  const [editorState, setEditorState] = useState(
    value ? RichTextEditor.createValueFromString(normalizeHtmlString(value), "html") : RichTextEditor.createEmptyValue()
  );

  return (
    <RichTextEditor
      value={editorState}
      onChange={(value) => {
        setEditorState(value);
        if (onChange) {
          onChange(trimHtmlContent(normalizeHtmlString(value.toString("html"))));
        }
      }}
      placeholder={placeholder}
      className={styles.htmlEditor}
      customStyleMap={CUSTOM_STYLE_MAP}
    />
  );
};

export default HtmlRte;
