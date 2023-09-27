kakao.maps.load(() => {
    var container = document.getElementById('map');
    Options = {
        center: new kakao.maps.LatLng(35.841182, 128.480736),
        level: 2
    };

    var map = new kakao.maps.Map(container, Options);
    var markerPosition = new kakao.maps.LatLng(35.841182, 128.480736);

    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    marker.setMap(map);

});   
