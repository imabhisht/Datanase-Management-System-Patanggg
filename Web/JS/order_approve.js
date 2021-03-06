window.onload = start_me;
function start_me(){
    eel.list_order('WaitingForApproval')(function(ret){
        var listObj = JSON.parse(ret);
        console.log(listObj)
        var personData = []
        for(i=0;i<listObj.length;i++){
            var userObj = JSON.parse(listObj[i]);
            personData.push(userObj)
        }
        console.log(personData)
        loadtableData(personData);
    })   
}
 
function loadtableData(personData){
    const tablebody = document.getElementById('tbody-product')
    let dataHtml = '';
    for(let person of personData){
        dataHtml += `
        <tr><td>${person.orderid}</td>
        <td>${person.ordernum}</td>
        <td><button type="button" class="btn btn-primary" onclick="info_press('${person.orderid}','${person.userid}')";>Info</button></td>
        <td>
        <button type="button" class="btn btn-danger" onclick="verify('${person.orderid}','${person.userid}','Cancelled','${person.ordernum}')";>Cancelled</button>
        <!--<button type="button" class="btn btn-warning" onclick="verify('${person.orderid}','${person.userid}','DelayApproval','${person.ordernum}')";>Delay Approval</button>-->
        <button type="button" class="btn btn-success" onclick="verify('${person.orderid}','${person.userid}','Approved','${person.ordernum}')";>Approve</button>
        </td></tr>`;
        }

    tablebody.innerHTML = dataHtml;
}

function status_change(product_id,user_id,change){
    eel.status_change(product_id,user_id,change,'WaitingForApproval')
    start_me()
}

function info_press(data,data2){
    eel.info_press(data2,data)(function(ret){
        var listObj = JSON.parse(ret[0]);
        var listObj2 = JSON.parse(ret[1]);
        var listObj3 = JSON.parse(ret[2]);
        var userData = []
        var dealData = []
        var productData = []
        for(i=0;i<listObj.length;i++){
            var userObj = JSON.parse(listObj[i]);
            userData.push(userObj)
        }
        for(i=0;i<listObj2.length;i++){
            var listObj_temp = JSON.parse(listObj2[i]);
            dealData.push(listObj_temp)
        }
        for(i=0;i<listObj3.length;i++){
            var listObj_temp = JSON.parse(listObj3[i]);
            productData.push(listObj_temp)
        }
        user_info_in_model(userData,dealData,productData)
    })   
}

function user_info_in_model(userData,dealData,productData){
    const modelbody = document.getElementById('exampleModal')
    let dataHtml = '';
    dataHtml += `
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Order Information</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"><h5>User Information</h5>`
    for(let alpha of userData){
    dataHtml += `
        <p><b>Name:</b> ${alpha.firstname} ${alpha.lastname} </p>
        <p><b>Email:</b> ${alpha.email} </p>
        <p><b>Phone:</b> ${alpha.phone} </p>
        <p><b>Address:</b> ${alpha.address} </p>
        <p><b>Pincode:</b> ${alpha.pincode} </p>
        <p><b>Date Joined:</b> ${alpha.datejoin} </p>
      `}
    
    dataHtml += `</div><div class="modal-body"><h5>Products</h5>`
      for(let s of dealData){
        dataHtml += `<p><b>Name:</b> ${s.itemname} <b>Quantity:</b> ${s.itemordered} <b>Rate:</b> ${s.itemperrate} </p>`}

    dataHtml += `</div><div class="modal-body"><h5>Deals</h5>`
        for(let s of productData){
          dataHtml+=`<p><b>Name:</b> ${s.itemname} <b>Quantity:</b> ${s.itemordered} <b>Rate:</b> ${s.itemperrate} </p>`}
    
    dataHtml += `
      </div>
    </div>
  </div>`
    modelbody.innerHTML = dataHtml;
    $('#exampleModal').modal('show');
}

function verify(data1,data2,data3,data4){
    const modelbody2 = document.getElementById('staticBackdrop')
    let dataHtml =`
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-body">
            <p><b>${data4}</b> confirm <b>${data3}</b> ?</p> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" onclick="status_change('${data1}','${data2}','${data3}')";>Yes</button>
        </div>
        </div>
    </div>
    </div>;`
    modelbody2.innerHTML = dataHtml;
    $('#staticBackdrop').modal('show');

}