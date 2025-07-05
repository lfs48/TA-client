export default function AppFallback() {

    return (
        <div className="w-screen h-screen p-12 flex justify-center items-center bg-anomaly-blue z-20">
            <p className="text-5xl text-center text-white">
                Oops, something went wrong! <br/><br/>Please refresh the page.
            </p>
        </div>
    );
}