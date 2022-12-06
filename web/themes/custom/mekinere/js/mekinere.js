jQuery(document).ready(function($){

    // sticky navbar on the way up, disappear on the way down.
    var $navbar = $(".navbar");
    var $admin = $("body");
    var $navbarChild = $("#navbarSupportedContent");
    $("header").css("top", $admin.css("padding-top"));
    $navbar.css("top", $admin.css("padding-top"));



    var $oldScroll = $(window).scrollTop();

    $(window).scroll(function() {
        $navbar.css("top", $admin.css("padding-top"));
        var $scrollC = $(this).scrollTop();


        if ($scrollC > $oldScroll) {
            $navbar.stop().animate({
                height: 0,
            }, 100, "linear", function() {
                $navbar.hide();
                $navbar.parent().css("pointer-events", "none");
        }); }
        else {
            $navbar.show();
            if (window.matchMedia('(max-width: 992px)').matches && $navbarChild.css("display") != "none") {
                $navbar.css("height", "70px");
                $navbar.parent().css("pointer-events", "auto");
            }
            else {
                $navbar.stop().animate({
                    height: 70,
                }, 100, "linear", function() {
                    $navbar.parent().css("pointer-events", "auto");
                });
            }
        }

        $oldScroll = $scrollC;
    });


    // light/dark toggle button + full page change

    var $toggle = $(".toggle");
    var $rare = $("#block-skillsblock .field--name-field-paragraphs .field__item, #block-numbersstats .field--name-field-paragraphs .field__item, .field--name-field-button p");
    var $about = $(".paragraph--type--about");
    var $more = $(".field--name-field-more");
    var $mainText = $(".nav-link, .field--name-field-header, #block-contactblock h2");
    var $greyText = $(".paragraph--type--about .field--name-field-desc, .paragraph--type--banner .field--name-field-desc, label");
    var $bannerLight = $(".paragraph--type--banner .field--name-field-photo .field__item:nth-child(1) .img-fluid");
    var $bannerDark = $(".paragraph--type--banner .field--name-field-photo .field__item:nth-child(2) .img-fluid");
    var $formBack = $("#block-contactblock");
    var $logoImage = $(".site-logo img");

    $toggle.click(function() {
        var $color = $(".region-nav-main");

        
        // dark to light
        if ($color.css("color") == "rgb(186, 133, 225)") {
            $toggle.css("transform", "rotate(0turn)");
            $logoImage.attr("src", "/themes/custom/mekinere/lightlogo.svg");
            $color.css({
                "color": "#c97110", 
                "transition": "color 0.4s"
            });
            $rare.css({
                "background-color": "#c97110",
                "color": "#FFF",
                "transition": "color 0.4s",
                "transition": "background-color 0.4s"
             });
             $bannerDark.fadeTo(300, 0);
             $bannerLight.fadeTo(300, 1);
             $mainText.css({
                "color": "#1d1d1d",
                "transition": "color 0.4s"
            });
            $greyText.css({
                "color": "#787878",
                "transition": "color 0.4s"
            });
            $more.css({
                "background-color": "initial",
                "transition": "background-color 0.4s"
            });
            $formBack.css({
                "background-color": "initial",
                "transition": "background-color 0.4s"
            });
             $about.css({
                "background-color": "initial",
                "transition": "background-color 0.4s"
            });


        // light to dark
        } else {
            $toggle.css("transform", "rotate(0.5turn)");
            $logoImage.attr("src", "/themes/custom/mekinere/darklogo.svg");

            $color.css({
                "color": "#BA85E1",
                "transition": "color 0.4s"
            });
            $rare.css({
                "background-color": "#e1ba85",
                "color": "#171717",
                "transition": "color 0.4s",
                "transition": "background-color 0.4s"
            });
            $bannerLight.fadeTo(300, 0);
            $bannerDark.fadeTo(300, 1);
            $mainText.css({
                "color": "#FFF",
                "transition": "color 0.4s"
            });
            $greyText.css({
                "color": "#FFF",
                "transition": "color 0.4s"
            });
            $more.css({
                "background-color": "#171717",
                "transition": "background-color 0.4s"
            });
            $formBack.css({
                "background-color": "#171717",
                "transition": "background-color 0.4s"
            });
            $about.css({
                "background-color": "#171717",
                "transition": "background-color 0.4s"
            });

        }
    });
    
    $allProject = $(".field--name-field-project .field__item");


    // gallery with hover icons
    var $hoverIcon = $(".field--name-field-hover");
    
    $hoverIcon.hover(function() {
        $(this).fadeTo(200, 1);
        $(this).closest(".node--type-project").find(".field--name-title").fadeTo(200, 1);
        $(this).css("background-filter", "blur(5px)");
    }, function() {
        $(this).closest(".node--type-project").find(".field--name-title").fadeTo(150, 0);
        $(this).fadeTo(150, 0);
        $(this).css("background-filter", "");
    });



    // gallery expansion
    $hoverIcon.click(function() {

        var $project = $(this).closest(".node--type-project");
        var $others = $(".field--name-field-project").children().children(".node--type-project");
        var $projectImage = $(this).closest(".img--fluid");

        var $link = $project.find(".field--name-title").parent().attr("href");

        $hoverIcon.css("z-index", "-1");
        $others.not($project).parent().animate({
            width: "0%",
            height: "0%",
        }, 300, "swing", function() {
            $(this).find(".field--name-title").css("z-index", "-1");
        });

        if (window.matchMedia('(max-width: 500px)').matches) {
            $project.parent().animate({
                width: "100%",
                height: "600px",
            }, 500, "swing", function(){
                $projectImage.css("width", "100%");
                $(this).find(".field--name-field-desc").fadeTo(1200, 1);
                var $arrow = $(this).find(".field--name-field-arrow");
                $arrow.html('<a href="#">' + $arrow.html() + '</a>');
                $arrow.fadeTo(1500, 1);
                $arrow.children().attr("href", $link);            
                $(this).find(".field--name-field-collapse").fadeTo(1500, 1);
                
                
                var $title = $project.find(".field--name-title");
                
                $title.css("z-index", "4");
                $title.css("top", "20%");
                $title.css("left", "10%");
                $title.fadeTo(200, 1);
                $more.css("pointer-events", "none");
                // $more.children().hide();
            });
            $gallery.parent().animate({
                height: "700px"
            }, 500, "swing");

            $gallery.animate({
                height: "600px"
            }, 500, "swing");
        } else {
            $project.parent().animate({
                width: "300%",
                height: "100%",
            }, 500, "swing", function(){
                $projectImage.css("width", "100%");
                $(this).find(".field--name-field-desc").fadeTo(1200, 1);
                var $arrow = $(this).find(".field--name-field-arrow");
                $arrow.html('<a href="#">' + $arrow.html() + '</a>');
                $arrow.fadeTo(1500, 1);
                $arrow.children().attr("href", $link);            
                $(this).find(".field--name-field-collapse").fadeTo(1500, 1);
                
                
                var $title = $project.find(".field--name-title");
                
                $title.css("z-index", "4");
                $title.css("top", "20%");
                $title.css("left", "10%");
                $title.fadeTo(200, 1);
                $more.css("pointer-events", "none");
                // $more.children().hide();
            });
        }
    });


    $collapse = $(".field--name-field-collapse");
    $galleryWidth = 100/3;

    // gallery collapse button
    $collapse.click(function() { 
        if (window.matchMedia('(max-width: 500px)').matches) {
            $galleryWidth = 100;
        }
        else if (window.matchMedia('(max-width: 992px)').matches) {
            $galleryWidth = 50;
        }
        else if (window.matchMedia('(min-width: 993px)').matches) {
            $galleryWidth = 100/3;
        }


        var $project = $(this).closest(".node--type-project");
        var $others = $(".field--name-field-project").children().children(".node--type-project");
        var $projectImage = $(this).closest(".img--fluid");


        $project.find(".field--name-field-desc").stop().fadeTo(100, 0);
        $project.find(".field--name-field-arrow").stop().fadeTo(100, 0);
        $project.find(".field--name-field-collapse").stop().fadeTo(100, 0);
              
        var $title = $project.find(".field--name-title");
        
        $title.css("z-index", "2");
        $title.css("top", "");
        $title.css("left", "");
        $title.fadeTo(100, 0);
        $projectImage.css("width", "");

        $project.parent().animate({
            width: $galleryWidth + "%",
            height: "300px",
        }, 500, "swing", function() {
            $(this).css("width", "");
        });


        $others.not($project).parent().animate({
            width: $galleryWidth + "%",
            height: "300px",
        }, 500, "swing", function() {
            $(this).find(".field--name-title").css("z-index", "2");
            $(this).css("width", "");
            $hoverIcon.css("z-index", "5");
            $more.css("pointer-events", "auto");
            $more.children().css("display", "");

        });
        if (window.matchMedia('(max-width: 500px)').matches) {
            $gallery.parent().animate({
                height: 600 + ($projectOverflow * 300) + 100 + "px"
            }, 500, "swing");
    
            $gallery.animate({
                height: 600 + ($projectOverflow * 300) + "px"
            }, 500, "swing", function() {
                $moreProject.show();
                $more.children().text("COLLAPSE");
            });
    
        }
        




    });

    $projectOverflow = 1;
    $gallery = $(".field--name-field-project");
    $moreProject = $(".field--name-field-project .field__item:nth-child(n + 7)");

    // load more button
    $more.click(function() {
        if (window.matchMedia('(max-width: 500px)').matches) {
            $projectOverflow = 7;
            $moreProject = $(".field--name-field-project .field__item:nth-child(n + 3)");
        }
        else if (window.matchMedia('(max-width: 992px)').matches) {
            $projectOverflow = 3;
            $moreProject = $(".field--name-field-project .field__item:nth-child(n + 5)");
        }
        else if (window.matchMedia('(min-width: 993px)').matches) {
            $projectOverflow = 1;
            $moreProject = $(".field--name-field-project .field__item:nth-child(n + 7)");
        }
        // expand
        if (($gallery.height()) == 600) {
            $gallery.parent().animate({
                height: 600 + ($projectOverflow * 300) + 100 + "px"
            }, 500, "swing");

            $gallery.animate({
                height: 600 + ($projectOverflow * 300) + "px"
            }, 500, "swing", function() {
                $moreProject.show();
                $more.children().text("COLLAPSE");
            });
            // $allProject.show();
        }
        // collapse
        else {
            $gallery.parent().animate({
                height: "700px"
            }, 500, "swing");

            $gallery.animate({
                height: "600px"
            }, 500, "swing", function() {
                $allProject.css("display", "");
                $more.children().text("LOAD MORE");

            });
        }


    });


});