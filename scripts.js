/*
    Returns an array of star images,
    meant to illustrate the rating score.

    The images are found in 'images/star_on.png'
    and 'images/star_off.png'.
*/
function HTMLStars(rating) {
    const result = [];

    for (let star = 1; star <= 5; star++) {

        const starOn = star <= rating;
        /* each star is lit up if its index (starting at 1)
        is less or equal to the rating
        */

        let starImgPath = 'images/star_on.png';
        let starImgAlt = 'star on';

        if (!starOn) {
            starImgPath = 'images/star_off.png';
            starImgAlt = 'star off';
        }

        result.push(
            $(`<img src="${starImgPath}" alt="${starImgAlt}" width="15px">`)
        );
    }

    return result;
}


$(document).ready(
    function () {
        const quotesCarousel = $('#carouselExampleControls .carousel-inner');
        const videosCarousel = $('#carouselExampleControls2 .carousel-inner');

        quotesCarousel.append(
            $('<div class="loader">')
        );

        videosCarousel.append(
            $('<div class="loader">')
        );

        videosCarousel.addClass('justify-content-center justify-content-md-end justify-content-lg-center');

        /* load quotes */
        $.ajax(
            {
                url: 'https://smileschool-api.hbtn.info/quotes',
                method: 'GET',
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error loading quotes: " + errorThrown);
                },
                success: function (data, textStatus, jqXHR) {

                    $('#carouselExampleControls .loader').remove();

                    for (const quoteData of data) {

                        const quoteHTML = $('<div class="carousel-item">').append(
                            $('<div class="row mx-auto align-items-center">').append(
                                $('<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">').append(
                                    $(`<img src="${quoteData.pic_url}" class="d-block align-self-center" alt="${quoteData.name}, ${quoteData.title}">`)
                                ),
                                $('<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">').append(
                                    $('<div class="quote-text">').append(
                                        $('<p class="text-white">').text(
                                            quoteData.text
                                        ),
                                        $('<h4 class="text-white font-weight-bold">').text(
                                            quoteData.name
                                        ),
                                        $('<span class="text-white">').text(
                                            quoteData.title
                                        )
                                    )
                                )
                            )
                        );

                        // The first quote should be active,
                        // so that it's visible.
                        // The carousel wouldn't work without this.
                        if (quoteData.id == 1) {
                            quoteHTML.addClass('active');
                        }

                        quotesCarousel.append(quoteHTML);
                    }
                }
            }
        );

        /* load videos */
        $.ajax(
            {
                url: 'https://smileschool-api.hbtn.info/popular-tutorials',
                method: 'GET',
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Error loading videos: " + errorThrown);
                },
                success: function (videosData, textStatus, jqXHR) {
                    $('#carouselExampleControls2 .loader').remove();

                    for (const videoCardData of videosData) {

                        const videoRatingStars = HTMLStars(videoCardData.star);

                        const videoCarouselItem = $('<div class="carousel-item col-12 col-sm-6 col-md-6 col-lg-3 d-flex">').append(
                            $('<div>').append(
                                $('<div class="card">').append(
                                    $(`<img src="${videoCardData.thumb_url}" class="card-img-top" alt="Video thumbnail"/>`),
                                    $('<div class="card-img-overlay text-center">').append(
                                        $('<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>')
                                    ),
                                    $('<div class="card-body">').append(
                                        $('<h5 class="card-title font-weight-bold">').text(
                                            videoCardData.title
                                        ),
                                        $('<p class="card-text text-muted">').text(
                                            videoCardData["sub-title"]
                                        ),
                                        $('<div class="creator d-flex align-items-center">').append(
                                            $(`<img src="${videoCardData.author_pic_url}" alt="the creator of this video, whose name is ${videoCardData.author}" width="30px" class="rounded-circle"/>`)
                                        ),
                                        $('<h6 class="pl-3 m-0 main-color">').text(
                                            videoCardData.author
                                        )
                                    ),
                                    $('<div class="info pt-3 d-flex justify-content-between">').append(
                                        $('<div class="rating">').append(
                                            videoRatingStars
                                        ),
                                        $('<span class="main-color">').text(
                                            videoCardData.duration
                                        )
                                    )
                                )
                            )
                        );

                        if (videoCardData.id <= 4) {
                            videoCarouselItem.addClass('active');
                        }

                        videosCarousel.append(videoCarouselItem);
                    }
                }
            }
        );

        /* Code for loading the courses videos */
        const keywordsSearchbar = $('input[type=text]');

        const topicDropdownChoiceSpan = $('#topic-dropdown span');
        const sortByDropdownChoiceSpan = $('#sort-by-dropdown span');

        const topicDropdownMenu = $('#topic-dropdown .dropdown-menu');
        const sortByDropdownMenu = $('#sort-by-dropdown .dropdown-menu');

        const videoCountSpan = $('span.video-count');

        const coursesDiv = $('section.results .row');

        function loadDropDownOptions() {
            $.ajax(
                {
                    url: 'https://smileschool-api.hbtn.info/courses',
                    method: 'GET',
                    success: function (data, textStatus, jqXHR) {

                        console.log(`DATA:`);
                        console.log(data);

                        for (const topicString of data.topics) {
                            const topicOption = $('<a class="dropdown-item" href="#">').text(
                                topicString
                            );

                            topicOption.click(
                                function () {
                                    topicDropdownChoiceSpan.text(topicString);
                                }
                            );

                            topicDropdownMenu.append(topicOption);
                        }

                        for (const sortByString of data.sorts) {
                            const sortByOption = $('<a class="dropdown-item" href="#">').text(
                                sortByString
                            );

                            sortByOption.click(
                                function () {
                                    sortByDropdownChoiceSpan.text(sortByString);
                                }
                            );

                            sortByDropdownMenu.append(sortByOption);
                        }
                    }
                }
            )
        }

        function loadVideoResults() {
            /* load course videos results */

            /*
            Update GUI to indicate that the browser is waiting
            for a response in the courses request
            */

            coursesDiv.empty();
            coursesDiv.append($('<div class="loader">'));
            videoCountSpan.text('... videos');

            $.ajax(
                {
                    url: 'https://smileschool-api.hbtn.info/courses',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        q: keywordsSearchbar.val(),
                        topic: topicDropdownChoiceSpan.text(),
                        sort: sortByDropdownChoiceSpan.text()
                    },
                    success: function (data, textStatus, jqXHR) {

                        /*
                        update GUI to indicate that
                        the browser is done waiting for request to finish
                        */
                        $('section.results .row .loader').remove();
                        videoCountSpan.text(`${data.courses.length} videos`);

                        /* append video cards to the DOM */
                        for (const videoCardData of data.courses) {
                            const videoCardStars = HTMLStars(videoCardData.star);

                            const videoCard =
                                $('<div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">').append(
                                    $('<div class="card">').append(
                                        $(`<img src="${videoCardData.thumb_url}" class="card-img-top" alt="Video thumbnail">`),
                                        $('<div class="card-img-overlay text-center">').append(
                                            $('<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">')
                                        ),
                                        $('<div class="card-body">').append(
                                            $(`<h5 class="card-title font-weight-bold">${videoCardData.title}</h5>`),
                                            $('<p class="card-text text-muted">').text(
                                                'Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod.'
                                            ),
                                            $('<div class="creator d-flex align-items-center">').append(
                                                $(`<img src="${videoCardData.author_pic_url}" alt="${videoCardData.author}, creator of video" width="30px" class="rounded-circle">`),
                                                $('<h6 class="pl-3 m-0 main-color">').text(
                                                    videoCardData.author
                                                )
                                            ),
                                            $('<div class="info pt-3 d-flex justify-content-between">').append(
                                                $('<div class="rating">').append(
                                                    videoCardStars
                                                ),
                                                $('<span class="main-color">').text(
                                                    videoCardData.duration
                                                )
                                            )
                                        )
                                    )
                                )
                            ;

                            coursesDiv.append(videoCard);
                        }
                    }
                }
            );
        }

        if (coursesDiv !== undefined) {
            keywordsSearchbar.on(
                "propertychange change keyup paste input",
                loadVideoResults
            );

            loadDropDownOptions();
            loadVideoResults();
        }
    }
);