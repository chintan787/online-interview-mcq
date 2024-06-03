export const styles = {
    pagecontainer: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // width:{
        //     xs:"auto",
        //     sm:"550px"
        //   },
        //   margin:{
        //     xs:"0 15px",
        //     sm:"0 auto"
        //   },
        "& .rdw-editor-toolbar.toolbarClassName": {
            display: 'none'
        },
        "& .editorClassName": {
            // background-color:lightgray;
            padding: "1rem",
            border: "1px solid #ccc",
        },



    },
    formContainer: {
        paddingTop: "50px",
        width: "100%"
    },
    formInput: {
        margin: "10px 0",
    },
    label:{
        width:"100%",
        margin:"15px 0",
        textAlign:"left"
    },
    selectLabel:{
        padding:"10px 0",
    },
    selectFormInput:{
        margin: "10px 0",
        textAlign:"left"
    }
}