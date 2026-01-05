import { useEffect, useState } from "react";
import type { CameraProps } from "../types/stream";
import Togle from "./togle";

function CameraDisplay({ camera }: { camera: CameraProps }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [imgSrc, setImgSrc] = useState(`${apiUrl}/camera/${camera.name}`);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (camera.is_update) {
      setImgSrc(`${apiUrl}/camera/${camera.name}?t=${Date.now()}`);
    }
  }, [camera.is_update]);

  const onTogleChange = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${apiUrl}/camera/control/${camera.name}?action=${!camera.status}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("Gagal mengubah status kamera");
      }

      const data = await res.json();
      console.log("Response backend:", data);
      setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false)
    }
  };

  return (
    <div className='camera-display'>
      <div className="title">
        <h4>Camera {camera.name}</h4>
        <Togle value={camera.status} setTogle={onTogleChange} disable={loading}/>
      </div>
      {loading ? <div className="loader-wrapper"><div className="loader" /></div> :
      <div className="">
        {camera.status ?
          loading ? <div className="loader-wrapper"><div className="loader" /></div> :
            <img src={imgSrc} alt={`camera-${camera.name}`} />
          :
          <p className="camera-off">Camera Off</p>
        }
  
        {camera.status &&
          <div className="tables">
            {camera.tables.map((table) => (
              <p key={`table-${table.id}`} className={table.status}>Table {table.id}</p>
            ))}
          </div>
        }
      </div>
      }
    </div>
  )
}

export default CameraDisplay