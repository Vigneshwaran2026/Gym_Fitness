

(function ($) {
    ("use strict");

    var headerSticky = function () {
        let lastScrollTop = 0;
        let delta = 5;
        let ticking = false;
        let a = jQuery;
        function updateHeader() {
            let st = a(window).scrollTop();
            let navbarHeight = a(".header-sticky").outerHeight();
            let adminBarHeight = a("#wpadminbar").length
                ? a("#wpadminbar").outerHeight()
                : 0;

            if (st < 0) st = 0;

            if (st > navbarHeight + 100) {
                a(".header-sticky").addClass("header-bg");
                a(".header-sticky").css({
                    transform: "translateY(0%)",
                    top: adminBarHeight,
                });
            } else {
                a(".header-sticky").removeClass("header-bg");
                a(".header-sticky").css({
                    transform: "translateY(-110%)",
                    top: adminBarHeight,
                });
            }

            lastScrollTop = st;
            ticking = false;
        }

        a(window).on("scroll", function () {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        updateHeader();
    };
    
    var video = function () {
        if ($(".wg-video").length) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
    };

    var btn = function () {
        $(document).on("click", function (e) {
            if (!$(e.target).closest(".search-btn, .form-search").length) {
                $(".top-search, .search-btn").removeClass("active");
                $("body").removeClass("no-scroll");
            }
        });

        $(".search-btn").on("click", function (e) {
            e.stopPropagation();
            $(".top-search, .search-btn").toggleClass("active");

            if ($(".top-search").hasClass("active")) {
                $("body").addClass("no-scroll");
            } else {
                $("body").removeClass("no-scroll");
            }
        });

        $(".form-search").on("click", function (e) {
            e.stopPropagation();
        });

        $(".button-close").on("click", function () {
            $(".top-search, .search-btn").removeClass("active");
            $("body").removeClass("no-scroll");
        });

        $(".item-check").on("click", function () {
            $(this).closest(".list-checks").find(".active").removeClass("active");
            $(this).addClass("active");
        });

    };
    
    var change_image = () => {
        $('.trainer-item').on('mouseenter', function(){
            if(!$(this).hasClass('active-img')) {
                $('.trainer-item').removeClass('active-img');
                $(this).addClass('active-img');
    
                const newImg = $(this).data('img');
                $('.trainer-image').find('img').css('opacity', 0);
                setTimeout(() => {
                  $('.trainer-image').find('img').attr('src', newImg).css('opacity', 1);
                }, 200);
            }
        });
        
        $('.programs-item').on('click', function(){
            if(!$(this).hasClass('active-img')) {
                $('.programs-item').removeClass('active-img');
                $(this).addClass('active-img');
    
                const newImg = $(this).data('img');
                $('.programs-image').find('img').css('opacity', 0);
                setTimeout(() => {
                  $('.programs-image').find('img').attr('src', newImg).css('opacity', 1);
                }, 200);
            }
        });
    };

    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const element = $(entry.target);

                            if (!element.hasClass("odometer-activated")) {
                                const to = element.data("to");
                                element.addClass("odometer-activated");

                                element.html(to);
                            }

                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            $(".counter .number").each(function () {
                observer.observe(this);
            });
        }
    };

    var progresslevel = function () {
        if ($(".progress-bars").length) {
            var bars = document.querySelectorAll(".progress-bars-line > div");
            setInterval(function () {
                bars.forEach(function (bar) {
                    var t1 = parseFloat(bar.dataset.progress);
                    var t2 = parseFloat(bar.dataset.max);
                    var getWidth = (t1 / t2) * 100;
                    bar.style.width = getWidth + "%";
                });
            }, 500);
        }
    };

    var circlesProgressLevel = function () {
        var circles = document.querySelectorAll(".progress-circle-svg");
        var observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
                        var el = entry.target;
                        var progressValue = parseFloat(el.dataset.progress);

                        var textElement = el.querySelector(".progress-text");
                        var progressBar = el.querySelector(".progress-ring-bar");

                        var radius = parseFloat(progressBar.getAttribute("r"));
                        var circumference = 2 * Math.PI * radius;

                        progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
                        progressBar.style.strokeDashoffset = circumference;

                        let currentProgress = 0;
                        let animationFrameId;

                        function animateCircle() {
                            if (currentProgress < progressValue) {
                                currentProgress += 1;
                                const offset = circumference - (currentProgress / 100) * circumference;
                                progressBar.style.strokeDashoffset = offset;
                                textElement.textContent = Math.round(currentProgress);
                                animationFrameId = requestAnimationFrame(animateCircle);
                            } else {
                                const finalOffset = circumference - (progressValue / 100) * circumference;
                                progressBar.style.strokeDashoffset = finalOffset;
                                textElement.textContent = Math.round(progressValue);
                                cancelAnimationFrame(animationFrameId);
                            }
                        }

                        animateCircle();
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.9 }
        );

        circles.forEach(function (circle) {
            observer.observe(circle);
        });
    };

    var handleAccordionBorders = function () {
        if (document.querySelector(".according-active")) {
            var accordions = document.querySelectorAll(".according-active .collapse");

            accordions.forEach(function (collapseEl) {
                var parentItem = collapseEl.closest(".according-active");

                var addActiveBorder = function () {
                    parentItem.classList.add("active");
                };

                var removeActiveBorder = function () {
                    parentItem.classList.remove("active");
                    var nextItem = parentItem.nextElementSibling;
                    if (nextItem && nextItem.classList.contains("according-active")) {
                        nextItem.style.borderTopColor = "";
                    }
                };

                if (collapseEl.classList.contains("show")) {
                    addActiveBorder();
                }

                collapseEl.addEventListener("show.bs.collapse", addActiveBorder);
                collapseEl.addEventListener("hide.bs.collapse", removeActiveBorder);
            });
        }
    };

    var parallaxImage = function () {
        if ($(".parallax-img").length > 0) {
            $(".parallax-img").each(function () {
                new SimpleParallax(this, {
                    delay: 0.6,
                    orientation: "up",
                    scale: 1.17,
                    transition: "cubic-bezier(0,0,0,1)",
                    customContainer: "",
                    customWrapper: "",
                });
            });
        }
    };

    var gotop = function () {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "stroke-dashoffset 10ms linear";
            var updateprogress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 0;
            var duration = 0;
            jQuery(window).on("scroll", function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
    };

    var switchPrice = () => {
        function formatUSD(n) {
          return '$' + Number(n).toLocaleString('en-US');
        }
    
        function updatePrices(isYearly) {
          $('.price-number').each(function () {
            const $p = $(this);
            const val = isYearly ? $p.data('year') : $p.data('month');
            $p.text(formatUSD(val));
            $p.next('.price-per').text(isYearly ? '/ year' : '/ month');
          });
        }
    
        $('#pricingSwitch').on('change', function () {
          updatePrices(this.checked);
        });
    
        if ($('#pricingSwitch').is(':checked')) {
          updatePrices(true);
        } else {
          updatePrices(false);
        }
    };

    var preloader = function () {
        $("#loading").fadeOut("slow", function () {
            $(this).remove();
        });
    };

    // Dom Ready
    $(function () {
        headerSticky();
        video();
        btn();
        change_image();
        counter();
        progresslevel();
        circlesProgressLevel();
        handleAccordionBorders();
        parallaxImage();
        gotop();
        switchPrice();
        preloader();
    });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bmiForm");

    if (!form) return;

    const fields = ["height", "weight", "age", "gender", "activity"];

    const result = document.getElementById("bmiResult");

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + "Error");

        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
        error.textContent = message;
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + "Error");

        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
        error.textContent = "";
    }

    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();

        clearError(fieldId);

        if (!value) {
            showError(fieldId, "This field is required.");
            return false;
        }

        if (fieldId === "height") {
            const height = Number(value);

            if (!Number.isFinite(height) ||
                height <= 0 || height > 120) {
                showError(
                    fieldId,
                    "Enter a valid height in inches."
                );
                return false;
            }
        }

        if (fieldId === "weight") {
            const weight = Number(value);

            if (!Number.isFinite(weight) ||
                weight <= 0 || weight > 1500) {
                showError(
                    fieldId,
                    "Enter a valid weight in pounds."
                );
                return false;
            }
        }

        if (fieldId === "age") {
            const age = Number(value);

            if (!Number.isInteger(age) || age < 2 || age > 120) {
                showError(
                    fieldId,
                    "Enter a valid age between 2 and 120."
                );
                return false;
            }
        }

        if (fieldId === "gender" && !value) {
            showError(fieldId, "Please select your gender.");
            return false;
        }

        if (fieldId === "activity" && !value) {
            showError(
                fieldId,
                "Please select your activity level."
            );
            return false;
        }

        return true;
    }

    fields.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);

        field.addEventListener("input", function () {
            validateField(fieldId);
        });

        field.addEventListener("change", function () {
            validateField(fieldId);
        });
    });

    form.addEventListener("submit", function (event) {
        // Prevent form submission and 404 redirects.
        event.preventDefault();

        result.hidden = true;
        result.textContent = "";

        let isValid = true;

        fields.forEach(function (fieldId) {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });

        if (!isValid) {
            const firstError = form.querySelector(".input-error");

            if (firstError) {
                firstError.focus();
            }

            return;
        }

        const heightInches = Number(
            document.getElementById("height").value
        );

        const weightLbs = Number(
            document.getElementById("weight").value
        );

        const age = Number(
            document.getElementById("age").value
        );

        // BMI = weight in pounds / height in inches² × 703
        const bmi = (weightLbs / (heightInches * heightInches)) * 703;

        let category;

        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi < 25) {
            category = "Healthy";
        } else if (bmi < 30) {
            category = "Overweight";
        } else {
            category = "Obese";
        }

        result.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Your BMI Result";

        const bmiText = document.createElement("p");
        bmiText.textContent = "BMI: " + bmi.toFixed(1);

        const categoryText = document.createElement("p");
        categoryText.textContent = "Weight Status: " + category;

        const note = document.createElement("p");
        note.textContent =
            age < 20
                ? "For children and teenagers, BMI should be interpreted using age- and sex-specific percentiles."
                : "BMI is a screening measure, not a diagnosis.";

        result.append(heading, bmiText, categoryText, note);
        result.hidden = false;
    });
});