export default function OpenClass( { name, ids } ) {
    return (
        <div> { ids }, { name } </div>
    );
};

export async function getServerSideProps( context ){
    const
        { name } = context.query;
    return {
        props: {
            ids: "dd",
            name: name
        }
    };
};