type ImageCardProps = {
    imagem: string;
};

export function ImageCard({imagem}: ImageCardProps) {
    return (
        <div className='flex w-full bg-jays-gray rounded-tr-2xl rounded-br-2xl max-lg:hidden'>
            <img src={imagem} alt="Logo Jays" className='self-center p-24'/>
        </div>
    )
}