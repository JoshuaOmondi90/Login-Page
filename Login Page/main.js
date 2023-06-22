if (
  // filter out outdated or non-screen media browsers
  window.matchMedia &&
  window.matchMedia("screen").matches
) {

  const
  
    inserts = {
      "after" : (src, dest) => {
        dest.parentNode.insertBefore(src, dest.nextSibling);
      },
      "before" : (src, dest) => {
        dest.parnentNode.insertBefore(src, dest);
      },
      "first" : (src, dest) => {
        dest.insertBefore(src, dest.firstChild);
      },
      "last" : (src, dest) => {
        dest.appendChild(src);
      }
    }, // inserts
  
    make = (tagName, data) => {
      let e = document.createElement(tagName);
      if (data) {
        if (data.attr) Object.assign(e, data.attr);
        if (data.parent) (
          inserts[data.place] || inserts.last
        )(e, data.parent);
      }
      return e;
    }, // make
  
    passwordInputs = document.querySelectorAll('input[type="password"]'),
    
    passwordShowHide = (event) => {
      let input = event.currentTarget.previousElementSibling;
      input.type = input.type === "text" ? "password" : "text";
      input.focus();
    }, // passwordShowHide
    
    passwordsEnable = (event) => {
      for (let input of passwordInputs) input.type = "password";
    }; // passwordEnable

  for (let input of passwordInputs) {
    input.classList.add('passwordShowHide');
    make("button", {
      attr : {
        textContent : "\uD83D\uDC41",
        title : "Show / Hide Password",
        type : "button", // remember, default is SUBMIT!
        onclick : passwordShowHide
      },
      parent : input,
      place : "after"
    } );
    let form = input.closest("form");
    if (form) form.addEventListener("submit", passwordsEnable);
  }
  
  make("style", {
    attr : {
      media : "screen",
      textContent : `
        .passwordShowHide + button {
          position:relative;
          float:left;
          width:1.6em;
          margin-left:-1.6em;
          padding:0.45em 0;
          font-size:1.25em;
          line-height:1.2em;
          text-align:center;
          border:none;
          background:transparent;
          transition:transform 0.3s;
          transform-origin:center;
        }
        .passwordShowHide + button:focus {
          outline:none;
          font-weight:bold;
          text-shadow:
            0 0 0.2em #5AF;
        }
        .passwordShowHide + button:hover {
          transform:scale(1.5);
        }
        .passwordShowHide[type="text"] + button:after {
          content:"\\2215";
          position:absolute;
          left:0;
          top:0.45em;
          width:1.6em;
          text-align:center;
          text-shadow:
            -0.1em 0 0 #FFF,
            0.1em 0 0 #FFF;
          color:#F00;
        }
      `
    },
    parent : document.head
  } );
  
}