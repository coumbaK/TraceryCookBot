// Ok, so I need to be able to process text

// UMD return exports

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["b"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("b"));
  } else {
    // Browser globals (root is window)
    root.tracery = factory(root.b);
  }
})(typeof self !== "undefined" ? self : this, function (b) {
  // Use b in some fashion.

  function groupBySplitter(splitter, sections) {
    let subgroups = [{ children: [] }];
    for (var i in sections) {
      let s = sections[i];
      if (s.splitter === splitter) {
        subgroups.push({ children: [] });
      } else {
        subgroups[subgroups.length - 1].children.push(s);
      }
    }
    return subgroups.map((s) => {
      if (s.children.length == 1) return s.children[0];
      else return s;
    });
  }

  function parseExit(exit) {
    // Given an exit, process it
    let parsed = parse("exit", exit);
    return {
      raw: exit,
      type: "exit"
    }
  }
  const CLOSE_CHARS = {
    "{": "}",
    "[": "]",
    "(": ")",
    "#": "#",
    "'": "'",
    "`": "`",
    '"': '"',
  };

  const CONTEXTS = {
    expression: {
      splitters: [
        ",",
        "?",
        ":",
        "||",
        "&&",
        "==",
        "<=",
        ">=",
        "!=",
        "+=",
        "-=",
        "/=",
        "*=",
        "%=",
        "^=",
        "=",
        "!",
        "-",
        "+",
        "/",
        "*",
        "%",
        "^",
      ],
      innerContexts: {
        "'": "rule",
        "`": "rule",
        '"': "rule",
        "(": "expression",
        "[": "expression",
        "{": "expression",
      },
    },

    exit: {
      splitters: ["->", " "],
      allowWhitespace: false,
      innerContexts: {
        "'": "rule",
        "`": "rule",
        '"': "rule",
        "(": "expression",
        "[": "expression",
        "{": "expression",
      },
    },
    rule: {
      allowWhitespace: true,
      innerContexts: {
        "#": "tag",
        "[": "rg",
      },
    },
    tag: {
      splitters: ["."],
      innerContexts: {
        "{": "expression",
        "(": "expression",
        "[": "rg",
      },
    },
    rg: {
      splitters: [":", ",", " for ", " in ", " where ", " if ", " else "],
      innerContexts: {
        "{": "expression",
        "(": "expression",
        "#": "tag",
        "[": "rg",
        "'": "rule",
        "`": "rule",
        '"': "rule",
      },
    },
  };

  function parse(contextID, s) {
    // Go through each character in s
    // If it is the close symbol of our current context, close this context
    // Else if it is the open symbol of a context, open a new context
    // Otherwise....?
    // If a splitter, add that

    if (typeof contextID !== "string")
      throw "non-string contextID" + contextID.toString();
    if (typeof s !== "string") throw "non-string to parse" + s.toString();

    let root = {
      s: s,
      type: "context",
      start: 0,
      end: s.length,
      errors: [],
      contextID: contextID,
      children: [],
    };

    let stack = [root];

    let section = root;

    function spacer() {
      return "\t".repeat(stack.length);
    }

    function sectionToString(section) {
      return `${
        section.type
      } ${section.openChar} ${section.closeChar} '${s.substring(section.start, section.end)}'`;
    }

    let textStart = 0;

    function addText(i) {
      // Add a text section
      let textSection = {
        type: "text",
        s: s,
        start: textStart,
        end: i,
      };
      // Skip empty strings
      if (i > textStart) section.children.push(textSection);
    }

    function closeContext(i, c) {
      addText(i);
      section.end = i + 1;
      stack.pop();

      section = stack[stack.length - 1];
      textStart = i + 1;
    }

    function openContext(i, c, newContextID) {
      let newSection = {
        type: "context",
        openChar: c,
        s: s,
        start: i,
        // errors: [],
        contextID: newContextID,
        children: [],
        closeChar: CLOSE_CHARS[c],
      };

      addText(i);
      textStart = i + 1;
      section.children.push(newSection);
      stack.push(newSection);
      section = newSection;
    }

    for (var i = 0; i < s.length; i++) {
      let c = s[i];
      context = CONTEXTS[section.contextID];
      // console.log(spacer() + section.closeChar)
      if (section.closeChar === c) {
        // Close this context
        closeContext(i, c);
      } else {
        // Is this a context-opener?
        let newContextID = context.innerContexts[c];
        if (newContextID) {
          // Open a new context
          openContext(i, c, newContextID);
        } else {
          // Neither open nor close, test for splitters
          for (var j in context.splitters) {
            let splitter = context.splitters[j];
            if (s.startsWith(splitter, i)) {
              addText(i);
              section.children.push({
                type: "splitter",
                start: i,
                splitter: splitter,
              });
              textStart = i + splitter.length;
              i += splitter.length - 1;
              break;
            }
          }
        }
      }
    }
    addText(i);

    return root;
  }
  
  return {
    parse,
    parseExit
  }
});
