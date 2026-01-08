import Card from "../components/Card"
import { useEffect, useState } from "react";
import Togle from "../components/togle";
import CameraDisplay from "../components/CameraDisplay";
import SummaryCard from "../components/SummaryCard";
import type { ResmonProps, CameraProps, StatusProps } from "../types/stream";

const initialResmon: ResmonProps = {
    cpu: { percent: null },
    memory: { used: null, total: null, percent: null },
    disk: { used: null, total: null, percent: null },
    temperature: { temperature: null },
    timestamp: null,
};

function Dashboard() {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [resmon, setResmon] = useState<ResmonProps>(initialResmon)
    const [cameras, setCameras] = useState<CameraProps[]>([]);
    const [manager, setManager] = useState<boolean>(false);
    const [activeSSE, setActiveSSE] = useState<boolean>(false)
    const [statusSummary, setStatusSummary] = useState<StatusProps>({
        clean: 0,
        used: 0,
        dirty: 0
    })

    useEffect(() => {
        if (!activeSSE) {
            setResmon(initialResmon);
            return;
        }

        const source = new EventSource(`${baseUrl}/stream`);

        source.onmessage = (event) => {
            const data = JSON.parse(event.data);

            setResmon(data.system);
            setCameras(data.cameras);
            setManager(data.manager)

            const allTables = data.cameras.flatMap((camera: CameraProps) => camera.tables);
            const counts: StatusProps = { clean: 0, used: 0, dirty: 0 };

            allTables.forEach((table: any) => {
                if (table.status in counts) counts[table.status as keyof StatusProps]++;
            });

            setStatusSummary(counts);
        };

        source.onerror = () => source.close();

        return () => source.close();
    }, [activeSSE]);

    return (
        <main className="dashboard">
            <section className="resource">
                <div className="title">
                    <h3>Resource Monitor</h3>
                    <Togle value={activeSSE} setTogle={setActiveSSE} />

                </div>
                <div className="resource-wrapper">
                    <Card name="CPU" value={resmon.cpu.percent} valueUnit={"%"} />
                    <Card
                        name="Memory"
                        value={resmon.memory.percent}
                        valueUnit="%"
                        usage={resmon.memory.used}
                        total={resmon.memory.total}
                        unit="MB"
                    />
                    <Card
                        name="Storage"
                        value={resmon.disk.percent}
                        valueUnit="%"
                        usage={resmon.disk.used}
                        total={resmon.disk.total}
                        unit="MB"
                    />
                    <Card
                        name="Temperature"
                        value={resmon.temperature.temperature}
                        valueUnit="C"
                        unit="C"
                    />
                </div>
            </section>
            <section className="sanitation">
                <div className="title">
                    <h3>Camera Monitor</h3>
                </div>
                {manager ?
                    <>
                        <div className="status-summary">
                            {Object.entries(statusSummary).map(([status, count]) => (
                                <SummaryCard
                                    key={`summary-${status}`}
                                    status={status}
                                    count={count}
                                />
                            ))}
                        </div>
                        <div className="camera-wrapper">
                            {cameras.map((camera) => (
                                <CameraDisplay key={camera.name} camera={camera} />
                            ))}
                        </div>
                    </>
                    :
                    <div className="close">
                        <p>Out of Operational Time</p>
                        <img src="/close.png" alt="Close Icon"/>
                    </div>
                }
            </section>
        </main>
    );
}

export default Dashboard;
