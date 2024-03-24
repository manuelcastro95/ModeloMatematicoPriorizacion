
const Pdf = ({ ruta }) => {
    return (
        <div className="w-full h-full">
            <iframe
                src={ruta}
                title="PDF Viewer"
                className="w-full h-full"
            ></iframe>
        </div>
    )
}

export default Pdf