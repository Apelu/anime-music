function HrWithName({ name }: { name: string }) {
    return (
        <div className="d-flex align-items-center">
            <hr className="flex-grow-1" />
            <span className="m-2 text-center">{name}</span>
            <hr className="flex-grow-1" />
        </div>
    );
}

export default HrWithName;
