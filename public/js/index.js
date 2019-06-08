    function bitingMyNail() {
        randomBackground();
        checkIfSharing();
    }

    //  Random background from unsplash 
    function randomBackground() {
        document.getElementById('wrapper').setAttribute('style', `background-image:url(../assets/images/background/background${Math.floor(Math.random() * 7)+1}.jpg);height:100vh;background-size: cover;`);
    }

    //  Check if someone shared a room
    function checkIfSharing() {
        let url = new URL(window.location.href);
        let room = url.searchParams.get("room");
        if (room !== undefined && room !== null && room !== '') {
            let html = '';
            html += ` `;
            html += ` <h1 class="mt-3" style="text-align: center">Chat rooms</h1>`;
            html += ` <p style="text-align: center">Someone invited you to join room <b>${room}</b>.</p>`;
            html += ` <div class="card-body">`;
            html += `     <form class="form-horizontal form-material" id="loginform" action="chat.html?">`;
            html += `         <h3 class="box-title m-b-20">Choose an username</h3>`;
            html += `         <div class="form-group ">`;
            html += `             <div class="col-xs-12">`;
            html += `                 <input class="form-control" type="text" required="" placeholder="User name" name="name"> </div>`;
            html += `         </div>`;
            html += `         <div style="display:none" class="form-group">`;
            html += `             <div class="col-xs-12">`;
            html += `                 <input class="form-control" type="text" required="" placeholder="Chat room" name="room" value=${room}> </div>`;
            html += `         </div>`;
            html += `         <div class="form-group text-center">`;
            html += `             <div class="col-xs-12 p-b-20">`;
            html += `                 <button class="btn btn-block btn-lg btn-info btn-rounded bg-dark" type="submit">Enter chat</button>`;
            html += `             </div>`;
            html += `         </div>`;
            html += `         <div class="text-center">`;
            html += `             <a href="https://ramonmorcillo.com" target="_blank" class="mt-5">Ramon morcillo @reymon359</a>`;
            html += `         </div>`;
            html += `     </form>`;
            html += ` </div>`;
            document.getElementsByClassName('login-box')[0].innerHTML = html;
        }
    }