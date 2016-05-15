function gid(id){
	return document.getElementById(id+"");
}
function Competed(){
	window.location.href="game/normal";
}
function pleaseLogIn(){
	alert("请先登录！");
}
function insertUsrname(){
	var usrnameInfo = gid("usrnameInfo");
	var modalusrname = gid("modal-usrname");
	usrnameInfo.style.color = '#7e7e7e';
	usrnameInfo.innerHTML = '请输入4-20长度的英文字符';
	usrnameInfo.style.visibility = 'visible';

}

function checkUsrname(){
	var re = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,19}$/
	var usrnameInfo = gid("usrnameInfo");
	var modalusrname = gid("modal-usrname");
	if(modalusrname.value==""){
		usrnameInfo.innerHTML = '必填';
		usrnameInfo.style.color = 'red';
	}else if(!re.test(modalusrname.value)){
		usrnameInfo.innerHTML = '请输入4-20长度的英文字符';
		usrnameInfo.style.color = 'red';
	}else{
		usrnameInfo.innerHTML = '格式符合要求';
		usrnameInfo.style.color = 'green';
		return true;
	}
	return false;
}

function insertPasswd1(){
	var passwd1Info = gid("passwd1Info");
	passwd1Info.style.color = '#7e7e7e';
	passwd1Info.innerHTML = '密码长度至少为7最多为20';
	passwd1Info.style.visibility = 'visible';
}

function checkPasswd1(){
	var re = /^([a-zA-Z0-9]|[._]){7,20}$/
	var passwd1Info = gid("passwd1Info");
	var modalpasswd1 = gid("modal-passwd1");
	if(modalpasswd1.value==""){
		passwd1Info.innerHTML = '必填';
		passwd1Info.style.color = 'red';
	}else if(!re.test(modalpasswd1.value)){
		passwd1Info.innerHTML = '请输入7-20长度的密码';
		passwd1Info.style.color = 'red';
	}else{
		passwd1Info.innerHTML = '正确';
		passwd1Info.style.color = 'green';
		return true;
	}
	return false;
}

function insertPasswd2(){
	var passwd2Info = gid("passwd2Info");
	passwd2Info.style.color = '#7e7e7e';
	passwd2Info.innerHTML = '密码必须保持相同';
	passwd2Info.style.visibility = 'visible';
}

function checkPasswd2(){
	var passwd2Info = gid("passwd2Info");
	var modalpasswd1 = gid("modal-passwd1");
	var modalpasswd2 = gid("modal-passwd2");
	if(modalpasswd2.value==""){
		passwd2Info.innerHTML = '必填';
		passwd2Info.style.color = 'red';
	}else if(modalpasswd2.value != modalpasswd1.value){
		passwd2Info.innerHTML = '密码必须保持相同';
		passwd2Info.style.color = 'red';
	}else{
		passwd2Info.innerHTML = '正确';
		passwd2Info.style.color = 'green';
		return true;
	}
	return false;
}

function insertEmail(){
	var emailInfo = gid("emailInfo");
	emailInfo.style.color = '#7e7e7e';
	emailInfo.innerHTML = '请输入正确格式的邮箱地址';
	emailInfo.style.visibility = 'visible';
}

function checkEmail(){
	var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	var emailInfo = gid("emailInfo");
	var modalemail = gid("modal-email");
	console.log()
	if(modalemail.value==""){
		emailInfo.style.visibility = 'hidden';
		return true;
	}else if(!re.test(modalemail.value)){
		emailInfo.innerHTML = '请输入正确格式的邮箱地址';
		emailInfo.style.color = 'red';
	}else{
		emailInfo.innerHTML = '正确';
		emailInfo.style.color = 'green';
		return true;
	}
	return false;
}

function insertNick(){
	var nickInfo = gid("nickInfo");
	nickInfo.style.color = '#7e7e7e';
	nickInfo.innerHTML = '昵称不能为空';
	nickInfo.style.visibility = 'visible';
}

function checkNick(){
	var nickInfo = gid("nickInfo");
	var modalnickName = gid("modal-nickName");
	if(modalnickName.value==""){
		nickInfo.innerHTML = '必填';
		nickInfo.style.color = 'red';
	}else{
		nickInfo.innerHTML = '正确';
		nickInfo.style.color = 'green';
		return true;
	}
	return false;
}

function checkAll(){
	var flag = false;
	flag = (checkUsrname() && checkPasswd1() && checkPasswd2() && checkEmail() && checkNick());
	if(flag){
		// var myModal = gid("myModal");
		// myModal.submit();

		$.ajax({
            cache: true,
            type: "POST",
            url:"/user/signup",
            data:$('#myModal').serialize(),// 你的formid
            async: true,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(网络连接中断);
            },
            success: function(msg) {
                if(msg=="true"){alert("成功")}
                else{
                	alert("该用户名已经被注册");
                }
            }
        });
	}else{
		alert('请检查您的信息');
	}
}