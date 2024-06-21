import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        // this get us the total minutes with the delivery time
        created.setMinutes(
        created.getMinutes() + order.restaurant.estimateDeliveryTime
        );

        // then we get the hours 
        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    // to have a different value for each status so the progress bar would
    // be dynamic we will define an order status with its value
    // just to be safe we will to || for safety 
    const getOrderStatusInfo = () => {
        return (
        ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        );
    };

    return (
        <>
        <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
            <span> Order Status: {getOrderStatusInfo().label}</span>
            <span> Expected by: {getExpectedDelivery()}</span>
        </h1>
        <Progress
            className="animate-pulse"
            value={getOrderStatusInfo().progressValue}
        />
        </>
    );
};

export default OrderStatusHeader;

// progress is the progress bar and write animate-pulse in the className 