/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


document.addEventListener("mousemove", (e) => {

    cursor.style.left =
        `${e.clientX}px`;

    cursor.style.top =
        `${e.clientY}px`;


    cursorDot.style.left =
        `${e.clientX}px`;

    cursorDot.style.top =
        `${e.clientY}px`;

});



/* =====================================================
   CURSOR HOVER
===================================================== */

const hoverElements =
    document.querySelectorAll(
        "a, button, .service-card, .project-card"
    );


hoverElements.forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            cursor.style.width = "55px";
            cursor.style.height = "55px";

            cursor.style.borderColor =
                "#00ff88";

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            cursor.style.width = "30px";
            cursor.style.height = "30px";

            cursor.style.borderColor =
                "rgba(0,255,136,.6)";

        }
    );

});



/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.querySelector(".menu-btn");

const navMenu =
    document.querySelector(".nav-menu");


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon =
        menuBtn.querySelector("i");


    if (
        navMenu.classList.contains("active")
    ) {

        icon.classList.remove(
            "fa-bars"
        );

        icon.classList.add(
            "fa-xmark"
        );

    } else {

        icon.classList.remove(
            "fa-xmark"
        );

        icon.classList.add(
            "fa-bars"
        );

    }

});


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "active"
                );

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }
        );

    });



/* =====================================================
   PROJECT 3D TILT
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 768
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) * -4;


            const rotateY =
                ((x - centerX) /
                    centerX) * 4;


            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                translateY(0)
                `;

        }
    );

});



/* =====================================================
   SERVICE 3D TILT
===================================================== */

const serviceCards =
    document.querySelectorAll(
        ".service-card"
    );


serviceCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 768
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y - rect.height / 2) /
                    (rect.height / 2)) * -3;


            const rotateY =
                ((x - rect.width / 2) /
                    (rect.width / 2)) * 3;


            card.style.transform =
                `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-12px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0)";

        }
    );

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .project-card, .service-card, .certificate-card, .profile-terminal, .about-text"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";


        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   REVEAL CLASS
===================================================== */

const revealStyle =
    document.createElement("style");


revealStyle.innerHTML = `

    .revealed {

        opacity: 1 !important;

        transform:
            translateY(0) !important;

    }

`;


document.head.appendChild(
    revealStyle
);



/* =====================================================
   TERMINAL TYPING
===================================================== */

const typingElement =
    document.querySelector(
        ".typing-text"
    );


const commands = [

    "./initialize.sh",

    "./network-check",

    "./cctv-status",

    "./system-ready"

];


let commandIndex = 0;

let charIndex = 0;

let deleting = false;


function typeCommand() {

    if (!typingElement) return;


    const currentCommand =
        commands[commandIndex];


    if (!deleting) {

        typingElement.textContent =
            currentCommand.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            currentCommand.length
        ) {

            deleting = true;

            setTimeout(
                typeCommand,
                1800
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentCommand.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1) %
                commands.length;

        }

    }


    setTimeout(
        typeCommand,
        deleting ? 40 : 80
    );

}


typeCommand();



/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

const magneticButtons =
    document.querySelectorAll(
        ".btn-primary, .terminal-button"
    );


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth < 768
            ) return;


            const rect =
                button.getBoundingClientRect();


            const x =
                e.clientX -
                rect.left -
                rect.width / 2;


            const y =
                e.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `
                translate(${x * .12}px,
                           ${y * .12}px)
                `;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0,0)";

        }
    );

});