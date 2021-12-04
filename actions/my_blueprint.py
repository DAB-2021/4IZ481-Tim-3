from sanic.response import json
from sanic import Blueprint

bp = Blueprint("my_blueprint")

@bp.route("/test")
async def bp_root(request):
    return json({"my": "blueprint"})