function register() {
    var email = document.getElementById('email').value;
    var user = document.getElementById('name').value;
    var passwords = document.getElementById('password').value;
    var passwordConfirm = document.getElementById('passwordConfirm').value;

    if (passwordConfirm != passwords){
        alert('密碼不相同');
    }else{
        $.get('http://' + ip + '/api/members',function(data,status){
        var same = false;    
        for (var i = 0; i < data.length; i++){
            if (email == data[i].email){
                same = true;
                break;    
            }
            if (user == data[i].user){
                same = true;
                break;    
            }
        };
        if(same == true){
            alert('same');
        }else{
            alert('good');
            $.post('http://' + ip + '/api/register', {'email': email, 'user': user, 'passwords': passwords}, function (data,status) {
            });
        }
    });
    }
    

}
