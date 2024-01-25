// when clicking the icon it rotates 360 and takes you to home-page
// Elvira
export function iconAnimation (e) {
    e.preventDefault();

    $('.logo').addClass('logoAnimation')

    if (this.href) {
        var target = this.href;
        setTimeout(function(){
            window.location = target;
        }, 1000);
    }
}
