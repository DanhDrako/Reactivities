using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub(IMediator mediator) : Hub
    {
        public async Task SendComment(AddComment.Command command)
        {
            var result = await mediator.Send(command);
            if (result.IsSuccess)
            {
                await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", result.Value);
            }
            else
            {
                throw new HubException(result.Error);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext?.Request.Query["activityId"];

            if (string.IsNullOrEmpty(activityId)) throw new HubException("No activity with this id");

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

            var result = await mediator.Send(new GetComments.Query { ActivityId = activityId! });

            if (result.IsSuccess)
            {
                await Clients.Caller.SendAsync("LoadComments", result.Value);
            }
            else
            {
                throw new HubException(result.Error);
            }
        }

    }
}
