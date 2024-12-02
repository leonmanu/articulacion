$(window).on("load", function () {
    hideSpinner()
})

function showSpinner() {
    $('#loading-spinner').addClass('d-flex')
}

function hideSpinner() {
    $('#loading-spinner').addClass('d-none')
}