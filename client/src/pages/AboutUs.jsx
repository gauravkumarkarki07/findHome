import AboutUsPage from '../assets/about-us.png';
export default function AboutUs() {
  return (
    <div>
      <section className="px-24 bg-gradient-to-r from-cyan-600 via-background to-primary">
        <div className="flex gap-6 justify-center items-center">
          <div className='flex flex-col gap-8 px-6'>
          <h1 className='font-semibold text-4xl'>About Us</h1>

          <p className='text-white text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dignissimos aut tempora repudiandae aperiam cupiditate cumque provident molestias ducimus, 
            labore quidem inventore rerum tenetur fugiat quasi voluptatibus a veniam. Iure, expedita.
          </p>
          </div>
          <img src={AboutUsPage}/>
        </div>
      </section>
      <section className='flex gap-6 justify-center items-center px-14 py-8 text-white h-72'>
        <div className='flex flex-col gap-3 border px-4 py-4 bg-cyan-500 rounded-lg h-full'>
          <h2 className='font-semibold text-2xl text-black'>Our Vision</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit mollitia eligendi doloremque voluptates 
            ex similique incidunt nemo eos voluptate. Corporis dolor ea nam et nulla, amet maiores hic nihil nesciunt.
          </p>
        </div>
        <div className='flex flex-col gap-3 border px-4 py-4 bg-cyan-500 rounded-lg h-full'>
          <h2 className='font-semibold text-2xl text-black'>Our Values</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ex exercitationem non nam? 
            Iusto modi quo similique! Cumque quidem, vel, nesciunt, unde fuga blanditiis explicabo eius fugit magni provident totam?
          </p>
        </div>
      </section>
    </div>
  )
}
