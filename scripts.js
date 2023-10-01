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

                    for (const videoData of videosData) {

                        let videoRatingStars = [];

                        for (let starCount = 1; starCount <= 5; starCount++) {
                            videoRatingStars.push(
                                $(`<img src="${starCount <= videoData.star ? 'images/star_on.png' : 'images/star_off.png'}" alt="star on" width="15px"/>`)
                            )
                        }

                        const videoCarouselItem = $('<div class="carousel-item">').append(
                            $('<div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">').append(
                                $('<div class="card">').append(
                                    $(`<img src="${videoData.thumb_url}" class="card-img-top" alt="Video thumbnail"/>`),
                                    $('<div class="card-img-overlay text-center">').append(
                                        $('<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>')
                                    ),
                                    $('<div class="card-body">').append(
                                        $('<h5 class="card-title font-weight-bold">').text(
                                            videoData.title
                                        ),
                                        $('<p class="card-text text-muted">').text(
                                            videoData["sub-title"]
                                        ),
                                        $('<div class="creator d-flex align-items-center">').append(
                                            $(`<img src="${videoData.author_pic_url}" alt="the creator of this video, whose name is ${videoData.author}" width="30px" class="rounded-circle"/>`)
                                        ),
                                        $('<h6 class="pl-3 m-0 main-color">').text(
                                            videoData.author
                                        )
                                    ),
                                    $('<div class="info pt-3 d-flex justify-content-between">').append(
                                        $('<div class="rating">').append(
                                            videoRatingStars
                                        ),
                                        $('<span class="main-color">').text(
                                            videoData.duration
                                        )
                                    )
                                )
                            )
                        );

                        
                        if (videoData.id == 1) {
                            videoData.addClass('active');
                        }

                        videosCarousel.append(videoCarouselItem);
                    }
                }
            }
        );
    }
);