# Courier-Tracking
Indian courier tracker api + telegram tracker bot

## Request
```
GET localhost:3000/{provider}/{trackingid}/
```
#### Currently supported courier services


|    {```provider```}     |    ?    |
|    :----------------    | :-----: |
| ```ekart```             |   ✅    |
| ```dtdc```              |   ✅    |
| ```india-post```        |   ✅    |
| ```delhivery```         |   ✅    |
| ```bluedart```          |   🤷‍♀️    |
| ```xpressbees```        |   🤷‍♀️    |
| ```dhl```               |   🤷‍♀️    |
| ```ecom```              |   🤷‍♀️    |
| ```gati```              |   🤷‍♀️    |
| ```shadowfax```         |   🤷‍♀️    |

## Response

```
    {
        time:   "13:04"
        date:   "Sep 10, 2021"
        status: "Successfully Delivered"
        place:  "Trivandrum branch"
    },
    {
        time:   "08:55"
        date:   "Sep 10, 2021"
        status: "Out for Delivery"
        place:  "Trivandrum branch"
    },
    {
        time:   "06:43"
        date:   "Sep 10, 2021"
        status: "Received at Facility"
        place:  "Cochin apex"
    },
    {...}...
    
```
## Demo URL
```
https://ctrack.vercel.app/{provider}/{trackingid}
```
### TODO
- Telegram bot with tracking notification