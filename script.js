const mouseCircle = document.querySelector('.mouse-circle');
const mouseDot = document.querySelector('.mouse-dot');

// define top and left positions for both elements

// Mouse Circle
//Note: The cssText property of the CSSStyleDeclaration interface returns or sets the text of the element's inline style declaration only.

// mouseCircleFn is called when the mouse moves
const mouseCircleFn = (x, y) => {
    mouseCircle.style.cssText = `top: ${y}px; left:${x}px; opacity:1`;
    mouseDot.style.cssText = `top: ${y}px; left:${x}px; opacity:1`;
};


let hoveredElPosition = []; //store pointer poistion, offsetTop offsetLeft
// run the call back function only once whenever the event mousemove happens
document.body.addEventListener('mousemove',(e) => {
    // if console.log(e) you can unpack the listed item and find clinentX and clientY
    let x = e.clientX;
    let y = e.clientY;
    mouseCircleFn(x, y);
    animateCircles(e,x,y);

    // Sticky Element
    const hoveredEl = document.elementFromPoint(x, y);
    // console.log(hoverEl) , whichever element the mouse hovered over, it prints out the element itself
    // check if this element needs to be sticky
    if (hoveredEl.classList.contains('sticky')) {
        //console.log('Sticky') // only menu-icon has sticky in class, <div class="menu-icon center sticky">
        if (hoveredElPosition.length < 1){
            hoveredElPosition = [hoveredEl.offsetTop, hoveredEl.offsetLeft]
        }
        //console.log(hoveredElPosition)

        hoveredEl.style.cssText=`top:${y}px; left: ${x}px`;
        // also update in .css file, .menu-icon{ transform: translate(-50%, -50%);}
        // Restric the motion of a stickly element within 100px from around
        if(hoveredEl.offsetTop <= hoveredElPosition[0] - 100 ||
            hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
            hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
            hoveredEl.offsetLeft >= hoveredElPosition[1] + 100
            ){
            hoveredEl.style.cssText="";
            hoveredElPosition = [];
        }
    }

    // when the hover the menu-icon up or right, as the 100px range includes the page edges
    // menu-icon stick at the edges if we hover over it
    // Thus, when the mouse left, it needs to be reset to original position
    hoveredEl.onmouseleave = () => {
        hoveredEl.style.cssText = "";
        hoveredElPosition = [];
      };
    
    // End of Sticky Element

})


//When the cursor leaves the page, the mouse disappears
// otherwise, the cursor will stop around the edge
document.body.addEventListener('mouseleave', () => {
    // to disapeear, just change its opacity 
    mouseCircle.style.opacity = '0';
    mouseDot.style.opacity = '0';
})

// End of Mouse Circle


// Animated Circles
// Notes: when the mouse moves, the circles should move the opposite
// [1] find the last position and compare with the 
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const z = 100;
const animateCircles = (e, x, y) => {
    if (x < mX) {
      circles.forEach((circle) => {
        circle.style.left = `${z}px`;
      });
      mainImg.style.left = `${z}px`;
    } else if (x > mX) {
      circles.forEach((circle) => {
        circle.style.left = `-${z}px`;
      });
      mainImg.style.left = `-${z}px`;
    }
  
    if (y < mY) {
      circles.forEach((circle) => {
        circle.style.top = `${z}px`;
      });
      mainImg.style.top = `${z}px`;
    } else if (y > mY) {
      circles.forEach((circle) => {
        circle.style.top = `-${z}px`;
      });
      mainImg.style.top = `-${z}px`;
    }
  
    mX = e.clientX;
    mY = e.clientY;
  };

// End of Animated Circles


// Main Button
// Notes: 
// [1] The mouseenter event is fired at an Element when a pointing device (usually a mouse) 
// is initially moved so that its hotspot is within the element at which the event was fired.
//[2] The Element.prepend() method inserts a set of Node objects or string objects before the first child of the Element. 


// const mainBtns = document.querySelector('.main-btn');
// let ripple;


// mainBtns.addEventListener('mouseenter', (e) => {
//     const left = e.clientX - e.target.getBoundingClientRect().left;
//     const top = e.clientY - e.target.getBoundingClientRect().top;

//     ripple = document.createElement('div');

//     ripple.classList.add('ripple');
//     ripple.style.left = `${left}px`;
//     ripple.style.top  = `${top}px`;
//     mainBtns.prepend(ripple);

// })

// mainBtns.addEventListener('mouseleave', (e) => {
//     mainBtns.removeChild(ripple)
// })

// Apply ripple effect to all buttons after pasting <Main Button> section to the common style section in css file
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    //console.log("hi");
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of Main Button

// Progress Bar
// const sections = document.querySelectorAll("section");
// const progressBar = document.querySelector(".progress-bar");
// const halfCircles = document.querySelectorAll(".half-circle");
// const halfCircleTop = document.querySelector(".half-circle-top");
// const progressBarCircle = document.querySelector(".progress-bar-circle");

// let scrolledPortion = 0;
// let scrollBool = false;
// let imageWrapper = false;

// const progressBarFn = (bigImgWrapper) => {
//   imageWrapper = bigImgWrapper;
//   let pageHeight = 0;
//   const pageViewportHeight = window.innerHeight;

//   if (!imageWrapper) {
//     pageHeight = document.documentElement.scrollHeight;
//     scrolledPortion = window.pageYOffset;
//   } else {
//     pageHeight = imageWrapper.firstElementChild.scrollHeight;
//     scrolledPortion = imageWrapper.scrollTop;
//   }

//   const scrolledPortionDegree =
//     (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

//   halfCircles.forEach((el) => {
//     el.style.transform = `rotate(${scrolledPortionDegree}deg)
// `;

//     if (scrolledPortionDegree >= 180) {
//       halfCircles[0].style.transform = "rotate(180deg)";
//       halfCircleTop.style.opacity = "0";
//     } else {
//       halfCircleTop.style.opacity = "1";
//     }
//   });

//   scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

//   // Arrow Rotation
//   if (scrollBool) {
//     progressBarCircle.style.transform = "rotate(180deg)";
//   } else {
//     progressBarCircle.style.transform = "rotate(0)";
//   }
//   // End of Arrow Rotation
// };

// // Progress Bar Click
// progressBar.addEventListener("click", (e) => {
//   e.preventDefault();

//   if (!imageWrapper) {
//     const sectionPositions = Array.from(sections).map(
//       (section) => scrolledPortion + section.getBoundingClientRect().top
//     );

//     const position = sectionPositions.find((sectionPosition) => {
//       return sectionPosition > scrolledPortion;
//     });

//     scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
//   } else {
//     scrollBool
//       ? imageWrapper.scrollTo(0, 0)
//       : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
//   }
// });
// End of Progress Bar Click

// progressBarFn();

// End of Progress Bar




// Navigation

const menuIcon = document.querySelector('.menu-icon')
const navbar = document.querySelector('.navbar')

const scrollFn = () => {
    menuIcon.classList.add('show-menu-icon')
    navbar.classList.add('hide-navbar')
    //if scrolling up, we need to revert back
    // if window.scrolly is 0 means we're back to the top
    if(window.scrollY === 0 ) {
        menuIcon.classList.remove('show-menu-icon')
        navbar.classList.remove('hide-navbar')
    }
    // progressBarFn();
}
 
document.addEventListener('scroll', scrollFn);
// document.addEventListener('scroll', () => {
    // menuIcon.classList.add('show-menu-icon')
    // navbar.classList.add('hide-navbar')
    // //if scrolling up, we need to revert back
    // // if window.scrolly is 0 means we're back to the top
    // if(window.scrollY === 0 ) {
    //     menuIcon.classList.remove('show-menu-icon')
    //     navbar.classList.remove('hide-navbar')
    // }
    //console.log(window.scrollY)

// })

menuIcon.addEventListener('click', () => {
    menuIcon.classList.remove('show-menu-icon')
    navbar.classList.remove('hide-navbar')
})




// End of Navigation



// About Me Text
const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTextContent = ' I am a skillful software engineer, have experience in building full-stack website and in Machine Learning and Deep Learning. Also, I have five-year professional experience in construction management.'

Array.from(aboutMeTextContent).forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    aboutMeText.appendChild(span);
    span.addEventListener('mouseenter', (e) => {
        e.target.style.animation = 'aboutMeTextAnim 10s infinite' 
    })
})




// End of About Me Text


// Projects
// Notes: The Element.firstElementChild read-only property 
// returns an element's first child Element, or null if there are no child elements.

const projects = document.querySelectorAll('.project')
const container = document.querySelector('.container') // Appendchile the wrapper to container
const projectHideBtn = document.querySelector('.project-hide-btn') 

// class project is one item
// In order to hide the last 4 projects, add i in the props
projects.forEach( (project, i) => {
    project.addEventListener('mouseenter', () => {
        // Goal is to change the top position of image when enters
        // project itself is the display frame we define 40rem x 45rem
        // project.firstElementChile is the image with its true dimensions
        project.firstElementChild.style.top=`-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`

    })
    project.addEventListener('mouseleave', () => {
        project.firstElementChild.style.top = '2rem'; 
        // reset it back to the original setting in css file
    })

    // Big Project Image
    project.addEventListener('click', () => {
        // create a black backdrop
        const bigImgWrapper = document.createElement('div');
        bigImgWrapper.className='project-img-wrapper';
        container.appendChild(bigImgWrapper);

        const bigImg = document.createElement('img');
        bigImg.className='project-img';
        const imgPath = project.firstElementChild.getAttribute('src').split('.')[0];
  
        bigImg.setAttribute('src', `${imgPath}-big.jpg`);
        bigImgWrapper.appendChild(bigImg);
        //document.body.style.overflowY="hidden"; // hide two scrolling down bars when big image pops up

        // define two stylings, one for .project-hide-btn and the other for .change.project-hide-btn
        // just need to add or remove .change from the element class to apply different styles
        projectHideBtn.classList.add('change');
        projectHideBtn.onclick = () => {
            projectHideBtn.classList.remove('change');
            // also need to remove the wrapper of the image
            bigImgWrapper.remove();
            // when the bigImg pops up, we hide the body's scrolling by setting document.body.style.overflowY="hidden"; 
            // Now after the wrapper is removed, the webpage can no long scroll up or down
            // need to reverse it
            document.body.style.overflowY="scroll";
            //document.addEventListener("scroll", scrollFn);
        }   
    })
    // End of Big Project Image

    // show less
    // if (i >= 6) {
    //     project.style.cssText="display:none; opacity:0";
    // }
    i >= 6 && (project.style.cssText="display:none; opacity:0");

})

// Projects Button

const projectsBtn = document.querySelector('.projects-btn');
const projectsBtnText = document.querySelector('.projects-btn span'); // change the text from show more to show less
// in script.js file, by default this button is set to show only 6 max projects, i >= 6 && (project.style.cssText="display:none; opacity:0");
// Therefore, if button is clicked, the client wants to see more, and showHideBool should be true
// That's why we initiate showHideBool as true
let showHideBool = true;

// When the remaining four projects show up, it doesn't automatically scroll down and focus on them
// Fix it with section3.scrollIntoView() in forEach loop
const section3 = document.querySelector('.section-3')

const showProjects = (project, i) => {
    setTimeout(() => {
        project.style.display='flex';
        section3.scrollIntoView({block:'end'});
    }, 600);

    setTimeout(() => {
        project.style.opacity='1'
    }, i * 200); // depends on the index
}

const hideProjects = (project, i) => {
    setTimeout(() => {
        project.style.display='none';
        section3.scrollIntoView({block:'end'});
    }, 1200);
    
    setTimeout(() => {
        project.style.opacity='0'
    }, (projects.length - i) * 200);
}

//A series clicking will go only through below codes
projectsBtn.addEventListener('click', (e) => {
    // by default once this button is clicked, it brings us to the top of the page
    // to prevent such default
    e.preventDefault();
    // modify the arrow when it clicks
    // toggle, add a class if it doesn't have it yet or remove it if it exists
    projectsBtn.firstElementChild.nextElementSibling.classList.toggle('change');

    projects.forEach((project, i) => {
        if(i >= 6) {
            if(showHideBool) {
                // show with different time delays, then project will appear one by one
                showProjects(project, i)
                projectsBtnText.textContent = 'Show Less'
            } else {
                // hide
                hideProjects(project, i)
                projectsBtnText.textContent = 'Show More'
            }
        }
    })
    showHideBool = !showHideBool; //reverse showHideBool everything projectsBtn is clicked
})


// End of Projects Button

// End of Projects


// Section 4

document.querySelectorAll('.service-btn').forEach((service) => {
    // when a service button is clicked, it shouldn't by default move up to the homepage
    service.addEventListener('click', (e) => {
        e.preventDefault();
        // service => each service-btn
        // service.nextElementSibling => serviceText
        const serviceText = service.nextElementSibling;
        serviceText.classList.toggle('change');
        // in .css use .change.serviceText

        // When service-btn is clicked service-btn moves to the left
        const rightPosition = serviceText.classList.contains('change') ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0;
        service.firstElementChild.style.right = rightPosition;
    })
})


// End of Section 4



// Section 5

//Form

const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Connect";
      formHeading.style.opacity = "1";
    }, 300);
  });

});

//End of Form

// // Slideshow, skipped
// const slideshow = document.querySelector('slideshow');

// // End of Slideshow


// Form Validation
const form = document.querySelector('.contact-form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

const messages = document.querySelectorAll('.message');
const error = (input, message) => {
    input.nextElementSibling.classList.add('error') // .error.message is defined in .css file
    input.nextElementSibling.textContent= message;
}

const success = (input) => {
    input.nextElementSibling.classList.remove('error')
}

const checkRequiredFields = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            error(input, `${input.id} is required`)
        }
    });
};


const checkLength = (input, min) => {
    if (input.value.trim().length < min) {
        error(input, `${input.id} must be at least ${min} characters`)
    } else {
        success(input);
    }
}


const checkEmail = (input) => {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (regEx.test(input.value.trim())) {
      success(input);
    } else {
      error(input, "Email is not valid");
    }
  };

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkLength(username, 2);
    checkLength(subject, 2);
    checkLength(message, 10);
    checkEmail(email);
    checkRequiredFields([username, email, subject, message]);
    // if a required field is empty error message should be xx is required
    // instead of x must be at least n characters
    // Hence, checkLength first then checkRequiredFields
    
})

// End of Form Validation



// End of Section 5