
// using jquery syntax

const { response } = require("express");

$("#add_user").submit(function(event){
    alert("Data inserted Successfully");
});


if(window.location.pathname=='/'){
    $ondelete =$(".table tbody td a.delete");
    $ondelete.click(()=>{
        var id = $(this).attr("data-id")

        var request ={
            "url":`http://localhost:3000/api/users${id}`,
            "method":"DELETE",
            "data":data
        }

        if(confirm("Do you want to delete this record ?"))
        {
            $.ajax(request).done(response)
            {
                alert("Data Updated Successfully");
                location.reload();
            }
        }

    })
}