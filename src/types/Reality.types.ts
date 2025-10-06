export interface Reality {
    id: string;
    name: string;
    trigger: RealityDetail;
    release: RealityDetail;
    track: RealityDetail;
    matrix: string[];
}

export interface RealityDetail {
    title: string;
    description: string;
}