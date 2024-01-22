import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <main>
      <section className="relative">
        <section className="fixed top-0 sm:left-3 left-0">
          <div className="h-[5rem] w-[7rem] relative">
            <Image
              className="object-cover w-full h-full "
              src="/logo.png"
              fill
              alt=""
              priority
            />
          </div>
        </section>

        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
