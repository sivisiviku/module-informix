import { PageableGetParam } from "../appValidator";

export class Pagination {
    public static paginateOption(query: PageableGetParam, options: any={}): any {
        options.skip = (query.page - 1) * query.size;
        options.take = query.size;

        if (query.sort !== "") {
            if (!options.order) {
                options.order = {};
            }

            const orders = query.sort.split(",");
            orders.forEach((order) => {
                const direction = order[0] === "-" ? "DESC" : "ASC";
                const column = order.substring(1);
                options.order[column] = direction;
            });
        }

        return options;
    }
}
