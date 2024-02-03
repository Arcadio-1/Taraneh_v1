import Divider from "@/components/Util/ui/Divider";

interface Props {
  cart_size: number;
}

const Navbar = ({ cart_size }: Props) => {
  return (
    <div>
      <div className="flex">
        <div>
          <div className="relative shrink px-4 py-4">
            <div className="flex gap-2">
              <h1 className="font-iranyekan_bold text-2xl text-g1_5">
                سبد خرید
              </h1>
              <div className=" flex items-center justify-center rounded-lg bg-g1_5 px-3">
                <span className="font-iransansnum  text-xl text-white">
                  {cart_size}
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[3.5px] w-full shrink rounded-tl-lg rounded-tr-lg bg-g1_5"></div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Navbar;
