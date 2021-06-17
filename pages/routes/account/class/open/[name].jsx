export default function OpenClass( { id, name } ) {
    return (
        <div> { id }, { name } </div>
    );
};

export async function getServerSideProps( context ){
    const
        { name, id } = context.query;
    return {
        props: {
            id: id,
            name: name
        }
    };
};