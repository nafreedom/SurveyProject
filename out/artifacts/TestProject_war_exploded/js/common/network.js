export default {
    requestURL : (url, form, successCb, errorCb) => {
        if (!url) {
            return;
        }

        $.ajax({
            url: url,
            data: form,
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                successCb(data);
            },
            error: function (data, xhr, status) {
                errorCb();
                console.log(data);
                console.error(xhr);
            }
        });
    }
}