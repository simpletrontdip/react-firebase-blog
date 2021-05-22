import { Box } from "@chakra-ui/layout";
import styles from "./RawHtmlContainer.module.scss";

import sanitizeHtml from "sanitize-html";

const normalizeHtmlString = (htmlContent) => htmlContent && sanitizeHtml(htmlContent);

const findAnchorTag = (node, maxTry = 3) => {
  if (!node || node === document.body || maxTry < 1) {
    return null;
  }

  if (node.tagName === "A") {
    return node;
  }

  return findAnchorTag(node.parentNode, maxTry - 1);
};

const openLinkInNewTab = (link) => link && window.open(link, "_blank");

const makeHandleLinkClick = (onClick) => (event) => {
  const anchorNode = findAnchorTag(event.target);

  if (anchorNode) {
    openLinkInNewTab(anchorNode.getAttribute("href"));
    // prevent default handler
    event.preventDefault();
    return;
  }

  // normal click
  if (onClick) {
    onClick(event);
  }
};

const RawHtmlContainer = ({ htmlContent, onClick, children, ...otherProps }) => {
  const customProps = htmlContent
    ? {
        dangerouslySetInnerHTML: { __html: normalizeHtmlString(htmlContent) },
      }
    : { children };
  return (
    <Box {...otherProps} {...customProps} onClick={makeHandleLinkClick(onClick)} className={styles.rawHtmlContainer} />
  );
};

export default RawHtmlContainer;
