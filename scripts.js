$(document).ready(
    function () {
        const quotesCarousel = $('#carouselExampleControls .carousel-inner');

        quotesCarousel.append(
            $('<div class="loader">')
        );

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
        )
    }
);