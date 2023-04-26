import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import data from "./data";

const inter = Inter({ subsets: ["latin"] });

const Gauge = dynamic(() => import("../../components/Gauge"), {
  ssr: false,
});

function Temperature() {
  const tempData = data.temp || null;

  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 md:gap-y-4 md:gap-x-2 lg:text-left">
      {tempData
        ? tempData.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            >
              <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
                {item.title} {item.id}
              </h2>
              <Gauge
                renderTo={`${item.title} ${item.id}`}
                width={200}
                height={200}
                units={"°C"}
                title={"Temperature"}
                value={item.value}
                minValue={0}
                maxValue={40}
                majorTicks={[40, 35, 30, 25, 20, 15, 10, 5, 0]}
                minorTicks={5}
                strokeTicks={true}
                barStartPosition="right"
                highlights={[
                  {
                    from: 0,
                    to: 10,
                    color: "red",
                  },
                  {
                    from: 10,
                    to: 15,
                    color: "yellow",
                  },
                  {
                    from: 15,
                    to: 25,
                    color: "#04fe2d",
                  },
                  {
                    from: 25,
                    to: 30,
                    color: "yellow",
                  },
                  {
                    from: 30,
                    to: 40,
                    color: "red",
                  },
                ]}
                valueBox
                colorPlate={"#fff"}
                borderShadowWidth={0}
                borders={false}
                needleType={"arrow"}
                needleWidth={2}
                needleCircleSize={7}
                needleCircleOuter
                needleCircleInner={false}
                animationDuration={10000}
                animationRule={"linear"}
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default Temperature;
